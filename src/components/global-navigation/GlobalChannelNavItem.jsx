import { GLOBAL_NAV_ICON_BG_COLOR } from "@configs/color";
import { Avatar, ListItem, ListItemAvatar } from "@mui/material";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const GlobalChannelNavItem = ({
    channel
}) => {
    const navigate = useNavigate();
    return (
        <ListItem onClick={() => {
            (async () => {
                navigate(`/channel/${channel.id}`);
            })();
        }} >
            <ListItemAvatar>
                <Avatar alt={channel.name} src={channel.thumbnail} sx={{ cursor: "pointer", bgcolor: GLOBAL_NAV_ICON_BG_COLOR }} >
                    {channel.name && channel.name[0]}
                </Avatar>
            </ListItemAvatar>
        </ListItem >
    );
};

GlobalChannelNavItem.propTypes = {
    channel: PropTypes.shape({
        id: PropTypes.any,
        name: PropTypes.string,
        thumbnail: PropTypes.string,
    }).isRequired
};

export { GlobalChannelNavItem };