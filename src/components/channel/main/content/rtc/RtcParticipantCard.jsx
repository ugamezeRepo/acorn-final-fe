import { Grid, Paper } from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
const RtcParticipantCard = ({ participant, signal }) => {
    /**
     * @type {React.MutableRefObject<HTMLVideoElement}
     */
    const videoRef = useRef(null);

    useEffect(() => {
        if (!participant.pc) return;
        navigator.mediaDevices.getUserMedia({ audio: true, video: true })
            .then(stream => stream.getTracks().forEach(t => participant.pc.addTrack(t, stream)));

        participant.pc.onicecandidate = ({ candidate, signal }) => {
            signal({ candidate, uuid: participant.uuid });
        };

        participant.pc.onnegotiationneeded = async () => {
            const offer = await participant.pc.createOffer();
            await participant.pc.setLocalDescription(offer);
            signal({ desc: offer, uuid: participant.uuid });
        };

        participant.pc.ontrack = (e) => {
            videoRef.current.srcObject = e.streams[0];
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [participant.pc]);
    return (
        <Grid item xs={4} sm={4} md={4} >
            <Paper elevation={3} sx={{ height: "240px" }}>
                {participant.name}
                <video autoPlay={true} ref={videoRef} />
            </Paper>
        </Grid >
    );
};


RtcParticipantCard.propTypes = {
    participant: PropTypes.object.isRequired,
    signal: PropTypes.func.isRequired,
};
export { RtcParticipantCard };