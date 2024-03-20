import { Grid, Paper } from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
const RtcParticipantCard = ({ participant, stream }) => {
    const videoRef = useRef(null);
    useEffect(() => {
        if (!videoRef.current) {
            console.log("video ref is null");
            return;
        }
        console.log("setting stream");
        console.log("uuid is => " + participant.uuid);
        console.log("stream => " + stream);
        videoRef.current.srcObject = stream;
    }, [videoRef, stream, participant.uuid]);
    return (
        <Grid item xs={4} sm={4} md={4} >
            <Paper elevation={3} sx={{ height: "240px", display: "flex", justifyContent: "center" }}>
                <div style={{ position: "absolute" }}>{participant.uuid}</div>
                <video autoPlay={true} ref={videoRef} style={{ objectFit: "contain", maxWidth: "100%", maxHeight: "100%" }} />
            </Paper>
        </Grid >
    );
};

RtcParticipantCard.propTypes = {
    participant: PropTypes.object.isRequired,
    stream: PropTypes.object,
};

export { RtcParticipantCard };