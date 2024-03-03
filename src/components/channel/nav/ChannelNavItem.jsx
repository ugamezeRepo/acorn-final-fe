import { ChannelContext } from "@contexts/ChannelContext";
import { Tag } from "@mui/icons-material";
import { ListItemButton } from "@mui/material";
import PropTypes from "prop-types";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";


const ChannelNavItem = ({
    // TODO: add props for topic type
    topicName,
    topicId,
}) => {
    const { currentChannel } = useContext(ChannelContext);
    const navigate = useNavigate();
    return (
        <ListItemButton onClick={() => {
            navigate(`/channel/${currentChannel.id}/topic/${topicId}`);
        }} sx={{ display: "flex", margin: "6px", borderRadius: "8px" }}>
            <Tag fontSize="small" sx={{ color: "gray", marginRight: "6px" }} />
            <span style={{ fontSize: "0.9em" }}>{topicName}</span>
        </ListItemButton>
    );
};

ChannelNavItem.propTypes = {
    topicName: PropTypes.string.isRequired,
    topicId: PropTypes.number.isRequired,
};
export { ChannelNavItem };