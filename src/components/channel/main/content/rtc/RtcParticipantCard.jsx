import { Peer } from "@components/channel/main/content/rtc/Peer";
import { Grid, Paper } from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useRef } from "react";

const RtcParticipantCard = ({ peer }) => {
    /**
     * @type {React.MutableRefObject<HTMLVideoElement>}
     */
    const videoRef = useRef(null);
    useEffect(() => {
        if (!videoRef.current) return;
        peer.registerRemoteStreamListener((stream) => {
            console.log("stream listener callback called : " + stream);
            videoRef.current.srcObject = stream;
        });
    }, [videoRef, peer]);
    return (
        <Grid item xs={4} sm={4} md={4} >
            <Paper elevation={3} sx={{ height: "240px", display: "flex", justifyContent: "center" }}>
                <div style={{ position: "absolute" }}>{peer.getUuid()}</div>
                <video autoPlay={true} ref={videoRef} style={{ objectFit: "contain", maxWidth: "100%", maxHeight: "100%" }} />
            </Paper>
        </Grid >
    );
};

RtcParticipantCard.propTypes = {
    peer: PropTypes.instanceOf(Peer).isRequired
};


export { RtcParticipantCard };