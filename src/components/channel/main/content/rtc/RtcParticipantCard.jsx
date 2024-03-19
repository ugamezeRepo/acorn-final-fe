import { Grid, Paper } from "@mui/material";
import PropTypes from "prop-types";
const RtcParticipantCard = ({ participant, videoRef }) => {
    return (
        <Grid item xs={4} sm={4} md={4} >
            <Paper elevation={3} sx={{ height: "240px", display: "flex", justifyContent: "center" }}>
                <video autoPlay={true} ref={ref => videoRef[participant.uuid] = ref} style={{ objectFit: "contain", maxWidth: "100%", maxHeight: "100%" }} />
            </Paper>
        </Grid >
    );
};

RtcParticipantCard.propTypes = {
    participant: PropTypes.object.isRequired,
    videoRef: PropTypes.object.isRequired,
};

export { RtcParticipantCard };