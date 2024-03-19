import { Grid, Paper } from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
const RtcParticipantCard = ({ participant, sendSignal }) => {
    /**
     * @type {React.MutableRefObject<HTMLVideoElement}
     */
    const videoRef = useRef(null);

    useEffect(() => {
        if (!participant.pc) return;
        if (!videoRef.current) return;
        (async () => {

            const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });

            stream.getTracks().forEach(t => participant.pc.addTrack(t, stream));
            videoRef.current.srcObject = stream;
            participant.pc.onicecandidate = ({ candidate }) => {
                sendSignal({ candidate, uuid: participant.uuid });
            };

            participant.pc.onnegotiationneeded = async () => {
                console.log("on negotiation needed");
                const offer = await participant.pc.createOffer();
                await participant.pc.setLocalDescription(offer);
                sendSignal({ desc: offer, uuid: participant.uuid });
            };

            participant.pc.ontrack = (e) => {
                videoRef.current.srcObject = e.streams[0];
            };
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [participant.pc, videoRef]);
    return (
        <Grid item xs={4} sm={4} md={4} >
            <Paper elevation={3} sx={{ height: "240px", display: "flex", justifyContent: "center" }}>
                {participant.name}
                <video autoPlay={true} ref={videoRef} style={{ objectFit: "contain", maxWidth: "100%", maxHeight: "100%" }} />
            </Paper>
        </Grid >
    );
};

RtcParticipantCard.propTypes = {
    participant: PropTypes.object.isRequired,
    sendSignal: PropTypes.func.isRequired,
};

export { RtcParticipantCard };