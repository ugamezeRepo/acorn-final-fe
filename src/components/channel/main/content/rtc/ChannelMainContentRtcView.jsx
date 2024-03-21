import { Peer } from "@components/channel/main/content/rtc/Peer";
import { RtcParticipantCard } from "@components/channel/main/content/rtc/RtcParticipantCard";
import { ChannelContext } from "@contexts/ChannelContext";
import styled from "@emotion/styled";
import { Grid, Paper } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";



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
    const [uuid] = useState(crypto.randomUUID());
    const [signal, setSignal] = useState(null);
    const [updatePeer, setUpdatePeer] = useState(false);
    const myVideoRef = useRef(null);
    const { lastJsonRtcSignal, sendJsonRtcSignal } = useContext(ChannelContext);
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
        sendJsonRtcSignal(signal);
    }, [signal, sendJsonRtcSignal]);


    useEffect(() => {
        (async () => {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            myVideoRef.current.srcObject = stream;
            setSignal({ uuid });
        })();
    }, [uuid]);


    useEffect(() => {
        (async () => {
            if (!lastJsonRtcSignal) return;
            const { desc, candidate, uuid: remoteUuid } = lastJsonRtcSignal;
            if (!remoteUuid || remoteUuid == uuid) return;

            if (!peerRef.current[remoteUuid] && !(desc && desc.type === "remove")) {
                peerRef.current[remoteUuid] = new Peer(remoteUuid, (sdp) => {
                    console.log("send signal");
                    setSignal({ ...sdp, uuid });
                });
                await peerRef.current[remoteUuid].init();
                console.log("1. create peer object for " + remoteUuid);
                setUpdatePeer(true);
            }

            if (candidate) {
                await peerRef.current[remoteUuid].addIceCandidate(candidate);
                console.log("2. receive ice candidate info");
            }

            if (desc) {
                if (desc.type === "offer") {
                    console.log("receive offer");
                    peerRef.current[remoteUuid].setRemoteDescription(desc);
                    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                    stream.getTracks().forEach(track => peerRef.current[remoteUuid].addTrack(track, stream));
                    await peerRef.current[remoteUuid].setLocalDescription(await peerRef.current[remoteUuid].createAnswer());
                    setSignal({ desc: peerRef.current[remoteUuid].getLocalDescription(), uuid });
                }
                if (desc.type === "answer") {
                    console.log("4. receive answer");
                    peerRef.current[remoteUuid].setRemoteDescription(desc);
                }
                if (desc.type === "remove") {
                    console.log("remove candidate with id = " + remoteUuid);
                    peerRef.current[remoteUuid] = null;
                    delete peerRef.current[remoteUuid];
                    setUpdatePeer(true);
                }
            }
        })();
    }, [uuid, lastJsonRtcSignal]);

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