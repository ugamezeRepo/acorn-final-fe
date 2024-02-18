import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const ChannelContext = createContext({
    channelId: null,
    channelName: null,
    topicId: null,
    topicName: null,
    setChannelId: () => { },
    setChannelName: () => { },
    setTopicId: () => { },
    setTopicName: () => { },
});


const ChannelContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const { channelId: pathChannelId, topicId: pathTopicId } = useParams();

    const [channelId, setChannelId] = useState(pathChannelId);
    const [channelName, setChannelName] = useState("테스트 채널");
    const [topicId, setTopicId] = useState(pathTopicId);
    const [topicName, setTopicName] = useState(null);

    console.log(channelId);

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
            setChannelId: updateChannelId,
            setChannelName,
            setTopicId: updateTopicId,
            setTopicName,
        }}>
            {children}
        </ChannelContext.Provider>
    );
};

ChannelContextProvider.propTypes = {
    children: PropTypes.element,
};

export { ChannelContext, ChannelContextProvider };