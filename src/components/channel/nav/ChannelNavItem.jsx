import { ChannelContext } from "@contexts/ChannelContext";
import { Tag } from "@mui/icons-material";
import { ListItemButton } from "@mui/material";
import PropTypes from "prop-types";
import { useContext } from "react";


const ChannelNavItem = ({
    // TODO: add props for topic type
    topicName,
    topicId,
}) => {
    const { setTopicId, setTopicName } = useContext(ChannelContext);
    return (
        <ListItemButton onClick={() => {
            console.log("clicked topic with id " + topicId);
            setTopicId(topicId);
            setTopicName(topicName);
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