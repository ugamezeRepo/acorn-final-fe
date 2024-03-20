import { RtcParticipantCard } from "@components/channel/main/content/rtc/RtcParticipantCard";
import { getWsBaseUrl } from "@configs/env";
import { ChannelContext } from "@contexts/ChannelContext";
import styled from "@emotion/styled";
import { Grid, Paper } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import useWebSocket from "react-use-websocket";


const ChannelMainContentRtcViewContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1; 
    flex-shrink: 1;
    min-width: 456px;
`;

const rtcConfig = {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    iceTransportPolicy: "all",
};

const ChannelMainContentRtcView = () => {
    /**
    * @type {React.MutableRefObject<HTMLVideoElement>}
    */
    const myVideoRef = useRef(null);
    const { currentChannel, currentTopic } = useContext(ChannelContext);
    const [signal, setSignal] = useState(null);
    const [socketUrl] = useState(`${getWsBaseUrl()}/webrtc/channel/${currentChannel.id}/topic/${currentTopic.id}`);
    const { sendJsonMessage, lastJsonMessage } = useWebSocket(socketUrl, {
        shouldReconnect: () => true,
        onClose: () => {
            console.log("closed");
        }
    });
    const [uuid] = useState(crypto.randomUUID());
    const [participants, setParticipants] = useState([]);
    const rtcRef = useRef({});
    const [streams, setStreams] = useState({});

    useEffect(() => {
        navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then(stream => myVideoRef.current.srcObject = stream);
        setSignal({ uuid });
        console.log("uuid changed");
    }, [uuid]);

    useEffect(() => {
        if (!signal) return;
        sendJsonMessage(signal);
    }, [signal, sendJsonMessage]);

    useEffect(() => {
        function createNewPeerConnection(remoteUuid) {

            rtcRef.current[remoteUuid] = new RTCPeerConnection(rtcConfig);
            rtcRef.current[remoteUuid].onicecandidate = function ({ candidate }) {
                console.log("on ice candidate");
                console.log("candidate => " + JSON.stringify(candidate));
                setSignal({ candidate, uuid });
            };
            rtcRef.current[remoteUuid].onnegotiationneeded = async function () {
                console.log("on negotiation needed");
                const offer = await rtcRef.current[remoteUuid].createOffer();
                await rtcRef.current[remoteUuid].setLocalDescription(offer);
                setSignal({ desc: rtcRef.current[remoteUuid].localDescription, uuid });
            };
            rtcRef.current[remoteUuid].ontrack = async function (e) {
                console.log("on track");
                console.log("uuid => " + remoteUuid);
                streams[remoteUuid] = e.streams[0];
                setStreams(streams);
            };
            (async () => {
                console.log("adding tracks..");
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
                stream.getTracks().forEach(t => {
                    console.log("am i adding?");
                    rtcRef.current[remoteUuid].addTrack(t, stream);
                });
            })();
            return { uuid: remoteUuid, pc: rtcRef.current[remoteUuid] };
        }

        if (!lastJsonMessage) return;
        const { desc, candidate, uuid: remoteUuid } = lastJsonMessage;
        if (remoteUuid === uuid) return;
        (async () => {
            const matching = participants.filter(p => p.uuid == remoteUuid);
            let participant = matching.length > 0 ? matching[0] : createNewPeerConnection(remoteUuid);
            let remove = false;
            if (desc) {
                if (desc.type === "offer") {
                    console.log("[offer]");
                    if (desc == null) {
                        console.log("why null 3?");
                    }
                    await participant.pc.setRemoteDescription(desc);
                    const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
                    stream.getTracks().forEach(track => participant.pc.addTrack(track, stream));
                    const answer = await participant.pc.createAnswer();
                    await participant.pc.setLocalDescription(answer);
                    if (!participant.pc.localDescription) {
                        console.log("why null2?");
                    }
                    setSignal({ desc: participant.pc.localDescription, uuid });
                }
                if (desc.type === "answer") {
                    console.log("[answer]");
                    await participant.pc.setRemoteDescription(desc);
                }
                if (desc.type === "remove") {
                    // console.log("[remove] " + remoteUuid);
                    // remove = true;
                }
            }
            if (candidate) {
                console.log("candidate?");
            }
            if (candidate && participant.pc.remoteDescription) {
                console.log("[candidate]");
                await participant.pc.addIceCandidate(candidate);
            }

            setParticipants(p => {
                if (remove) {
                    return p.filter(p => p.uuid != remoteUuid);
                } else if (p.filter(p => p.uuid == remoteUuid).length == 0) {
                    return [...p, participant];
                }
                return p;
            });
            if (remove) {
                rtcRef.current[remoteUuid] = null;
            }
        })();
        /** adding participants into dependency array makes infinite loop ;( */
        // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [lastJsonMessage, uuid]);

    useEffect(() => {
        console.log(JSON.stringify(participants));
    }, [participants]);
    return (
        <ChannelMainContentRtcViewContainer>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ padding: "12px", overflow: "auto" }}>
                {/* video for me */}
                <Grid item xs={4} sm={4} md={4} >
                    <Paper elevation={3} sx={{ height: "240px", display: "flex", justifyContent: "center" }}>
                        <div style={{ position: "absolute" }}>{uuid}</div>
                        <video autoPlay={true} ref={myVideoRef} style={{ objectFit: "contain", maxWidth: "100%", maxHeight: "100%" }} />
                    </Paper>
                </Grid >
                {/* video for participant */}
                {
                    participants.map((participant, idx) => {

                        return <RtcParticipantCard key={idx} participant={participant} stream={streams[participant.uuid]} />;
                    })
                }
            </Grid>
        </ChannelMainContentRtcViewContainer>
    );
};

export { ChannelMainContentRtcView };