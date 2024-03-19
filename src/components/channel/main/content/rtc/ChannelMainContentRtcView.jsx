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
    const remoteVideosRef = useRef({});
    const { currentChannel, currentTopic } = useContext(ChannelContext);
    const [signal, setSignal] = useState(null);
    const { sendJsonMessage, lastJsonMessage } = useWebSocket(`${getWsBaseUrl()}/webrtc/channel/${currentChannel.id}/topic/${currentTopic.id}`, { shouldReconnect: () => true });
    const [uuid] = useState(crypto.randomUUID());
    const [participants, setParticipants] = useState({});

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
            const rtc = new RTCPeerConnection(rtcConfig);
            rtc.onicecandidate = ({ candidate }) => {
                console.log("on ice candidate");
                setSignal({ candidate, uuid });
            };
            rtc.onnegotiationneeded = async () => {
                console.log("on negotiation needed");
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
                stream.getTracks().forEach(t => rtc.addTrack(t, stream));
                const offer = await rtc.createOffer();
                await rtc.setLocalDescription(offer);
                setSignal({ desc: offer, uuid });
            };
            rtc.ontrack = (e) => {
                console.log("on track");
                remoteVideosRef.current[remoteUuid].srcObject = e.streams[0];
            };

            console.log("create new peer connection called");
            console.log(" created result => " + JSON.stringify({ uuid: remoteUuid, pc: rtc }));
            return { uuid: remoteUuid, pc: rtc };
        }

        if (!lastJsonMessage) return;
        const { desc, candidate, uuid: remoteUuid } = lastJsonMessage;
        if (remoteUuid === uuid) return;
        let participant = participants[remoteUuid] ? participants[remoteUuid] : createNewPeerConnection(remoteUuid);
        let remove = false;
        (async () => {
            if (desc) {
                if (desc.type === "offer") {
                    console.log("[offer]");
                    await participant.pc.setRemoteDescription(desc);
                    const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
                    stream.getTracks().forEach(track => participant.pc.addTrack(track, stream));
                    const answer = await participant.pc.createAnswer();
                    await participant.pc.setLocalDescription(answer);
                    setSignal({ desc: answer, uuid });
                }
                if (desc.type === "answer") {
                    console.log("[answer]");
                    await participant.pc.setRemoteDescription(desc);
                }
                if (desc.type === "remove") {
                    console.log("[remove] " + remoteUuid);
                    remove = true;
                }
            }
            if (candidate) {
                console.log("[candidate]");
                await participant.pc.addIceCandidate(candidate);
            }
        })();
        setParticipants(p => {
            if (remove) {
                participant = null;
            }
            return { ...p, [remoteUuid]: participant };
        });
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
                        <video autoPlay={true} ref={myVideoRef} style={{ objectFit: "contain", maxWidth: "100%", maxHeight: "100%" }} />
                    </Paper>
                </Grid >
                {/* video for participant */}
                {Object.keys(participants).map(remoteUuid =>
                    participants[remoteUuid] && (<RtcParticipantCard key={remoteUuid} participant={participants[remoteUuid]} videoRef={remoteVideosRef} />))}
            </Grid>
        </ChannelMainContentRtcViewContainer>
    );
};

export { ChannelMainContentRtcView };