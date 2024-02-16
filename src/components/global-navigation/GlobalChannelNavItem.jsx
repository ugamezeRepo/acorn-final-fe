import { ChannelContext } from "@contexts/ChannelContext";
import { Avatar, ListItem, ListItemAvatar } from "@mui/material";
import PropTypes from "prop-types";
import { useContext } from "react";

const GlobalChannelNavItem = ({
    channelName,
    channelThumbnail,
    channelId,
}) => {
    const { setChannelId } = useContext(ChannelContext);

    return (
        <ListItem onClick={() => setChannelId(channelId)}>
            <ListItemAvatar>
                <Avatar alt={channelName} src={channelThumbnail}></Avatar>
            </ListItemAvatar>
        </ListItem >
    );
};

GlobalChannelNavItem.propTypes = {
    channelName: PropTypes.string,
    channelThumbnail: PropTypes.string,
    channelId: PropTypes.number.isRequired,
};

export { GlobalChannelNavItem };