import { axiosClient } from "@components/AxiosClient";
import { ChannelContext } from "@contexts/ChannelContext";
import { Avatar, ListItem, ListItemAvatar } from "@mui/material";
import PropTypes from "prop-types";
import { useContext } from "react";

const GlobalChannelNavItem = ({
    channel
}) => {
    const { setTopics, setCurrentTopic, setCurrentChannel } = useContext(ChannelContext);

    return (
        <ListItem onClick={() => {
            (async () => {
                const { data: topics } = await axiosClient.get(`/channel/${channel.id}/topic`);
                setTopics(topics);
                setCurrentTopic(topics[0]);
                setCurrentChannel(channel);
            })();
        }} >
            <ListItemAvatar>
                <Avatar alt={channel.name} src={channel.thumbnail} sx={{ cursor: "pointer" }}>
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