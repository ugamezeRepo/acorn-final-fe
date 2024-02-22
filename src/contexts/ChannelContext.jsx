import { getWsBaseUrl } from "@configs/env";
import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const ChannelContext = createContext({
    channelId: null,
    channelName: null,
    topicId: null,
    topicName: null,
    messageWebSocket: null,
    setChannelId: () => { },
    setChannelName: () => { },
    setTopicId: () => { },
    setTopicName: () => { },
    setMessgaeWebSocket: () => { },
});


const ChannelContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const { channelId: pathChannelId, topicId: pathTopicId } = useParams();

    const [channelId, setChannelId] = useState(pathChannelId);
    const [channelName, setChannelName] = useState("테스트 채널");
    const [topicId, setTopicId] = useState(pathTopicId);
    const [topicName, setTopicName] = useState(null);
    const [messageWebSocket, setMessgaeWebSocket] = useState(null);



    useEffect(() => {
        if (channelId !== null && topicId !== null) {
            navigate(`/channel/${channelId}/topic/${topicId}`);
        }
    }, [channelId, topicId, navigate]);

    const updateChannelId = (channelId) => {
        setChannelId(channelId);
        setTopicId(1);
    };

    const updateTopicId = (topicId) => {
        setTopicId(topicId);
    };

    return (
        <ChannelContext.Provider value={{
            channelId,
            channelName,
            topicId,
            topicName,
            messageWebSocket,
            setChannelId: updateChannelId,
            setChannelName,
            setTopicId: updateTopicId,
            setTopicName,
            setMessgaeWebSocket,
        }}>
            {children}
        </ChannelContext.Provider>
    );
};

ChannelContextProvider.propTypes = {
    children: PropTypes.element,
};

export { ChannelContext, ChannelContextProvider };