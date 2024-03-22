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
            setSignal({ type: "join", uuid, target: "all" });
        })();
    }, [uuid]);


    useEffect(() => {
        (async () => {
            if (!lastJsonRtcSignal) return;
            const { type, uuid: remoteUuid, payload, target } = lastJsonRtcSignal;
            if (remoteUuid == uuid) return;
            if (target != "all" && target != uuid) return;

            if (type == "join" && !peerRef.current[remoteUuid]) {
                console.log("new member joined with id " + remoteUuid);
                peerRef.current[remoteUuid] = new Peer(remoteUuid, (sdp) => setSignal({ ...sdp, uuid }));
                await peerRef.current[remoteUuid].init();
                setUpdatePeer(true);
                setSignal({ type: "exists", uuid, target: remoteUuid });
            }

            if (type == "exists" && !peerRef.current[remoteUuid]) {
                console.log("add existing member with id " + remoteUuid);
                peerRef.current[remoteUuid] = new Peer(remoteUuid, (sdp) => setSignal({ ...sdp, uuid }));
                setUpdatePeer(true);
            }

            if (type == "sdp") {
                if (payload.type === "offer") {
                    console.log("receive offer from " + remoteUuid);
                    await peerRef.current[remoteUuid].setRemoteDescription(payload);
                    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                    stream.getTracks().forEach(track => peerRef.current[remoteUuid].addTrack(track, stream));
                    await peerRef.current[remoteUuid].setLocalDescription(await peerRef.current[remoteUuid].createAnswer());
                    setSignal({ type: "sdp", uuid, payload: peerRef.current[remoteUuid].getLocalDescription(), target: remoteUuid });
                }
                if (payload.type === "answer") {
                    console.log("receive answer from " + remoteUuid);
                    await peerRef.current[remoteUuid].setRemoteDescription(payload);
                }
            }

            if (type == "ice") {
                console.log("receive ice candidate info from " + remoteUuid);
                await peerRef.current[remoteUuid].addIceCandidate(payload);
            }

            if (type == "exit") {
                console.log("remove candidate with id = " + remoteUuid);
                peerRef.current[remoteUuid] = null;
                delete peerRef.current[remoteUuid];
                setUpdatePeer(true);
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