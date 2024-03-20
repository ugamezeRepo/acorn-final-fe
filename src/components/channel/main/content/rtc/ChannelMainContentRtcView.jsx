import { Peer } from "@components/channel/main/content/rtc/Peer";
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


const ChannelMainContentRtcView = () => {
    /**
    * @type {React.MutableRefObject<HTMLVideoElement>}
    */
    const myVideoRef = useRef(null);
    const [uuid] = useState(crypto.randomUUID());
    const { currentChannel, currentTopic } = useContext(ChannelContext);
    const [signal, setSignal] = useState(null);
    const [updatePeer, setUpdatePeer] = useState(false);

    const { sendJsonMessage, lastJsonMessage } = useWebSocket(`${getWsBaseUrl()}/webrtc/channel/${currentChannel.id}/topic/${currentTopic.id}`, { shouldReconnect: () => true });
    /**
     * @type{ [Peer[], React.Dispatch<React.SetStateAction<Peer[]>>]}
     */
    const [peers, setPeers] = useState([]);
    /**
     * @type {React.MutableRefObject<{[key: any] : Peer}>
     */
    const peerRef = useRef({});

    // signal handler
    useEffect(() => {
        if (!signal) return;
        sendJsonMessage(signal);
    }, [signal, sendJsonMessage]);


    useEffect(() => {
        (async () => {
            console.log("get user media");
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            console.log("add srcObject");
            myVideoRef.current.srcObject = stream;
            setSignal({ uuid });
        })();
    }, []);

    useEffect(() => {
        (async () => {
            if (!lastJsonMessage) return;
            const { desc, candidate, uuid: remoteUuid } = lastJsonMessage;
            if (!remoteUuid || remoteUuid == uuid) return;
            console.log("json message => " + JSON.stringify(lastJsonMessage));
            if (!peerRef.current[remoteUuid]) {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                peerRef.current[remoteUuid] = new Peer(remoteUuid, stream, setSignal);
                setUpdatePeer(true);
            }

            if (desc) {
                console.log("desc => " + JSON.stringify(desc));
                if (desc.type == "offer") {
                    console.log("offer!");
                    console.log("set remote description on offer");
                    await peerRef.current[remoteUuid].setRemoteDescription(desc);
                    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                    stream.getTracks().forEach(track => peerRef.current[remoteUuid].addTrack(track, stream));
                    await peerRef.current[remoteUuid].setLocalDescription(await peerRef.current[remoteUuid].createAnswer());
                    setSignal({ desc: peerRef.current[remoteUuid].getLocalDescription(), uuid });
                }
                if (desc.type == "answer") {
                    console.log("set remote description on answer");
                    await peerRef.current[remoteUuid].setRemoteDescription(desc);
                }
            }
            if (candidate) {
                console.log("candidate => " + JSON.stringify(candidate));
                await peerRef.current[remoteUuid].addIceCandidate(candidate);
            }
        })();
    }, [uuid, lastJsonMessage]);

    useEffect(() => {
        if (!updatePeer) return;
        setPeers(Object.keys(peerRef.current).map(uuid => peerRef.current[uuid]));
        setUpdatePeer(false);
    }, [updatePeer]);


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
                    peers.map((peer, idx) => {
                        return <RtcParticipantCard key={idx} peer={peer} />;
                    })
                }
            </Grid>
        </ChannelMainContentRtcViewContainer>
    );
};

export { ChannelMainContentRtcView };