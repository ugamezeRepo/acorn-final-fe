import { axiosClient } from "@components/AxiosClient";
import { getWsBaseUrl } from "@configs/env";
import { MemberContext } from "@contexts/MemberContext";
import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useWebSocket from "react-use-websocket";

const ChannelContext = createContext({
    topics: [],
    currentChannel: { id: null, name: null, thumbnail: null },
    currentTopic: { id: null, title: null },
    messageWebSocket: null,
    messages: [],
    setTopics: () => { },
    setCurrentChannel: () => { },
    setCurrentTopic: () => { },
    setMessages: () => { },
});


const ChannelContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const { channelId: pathChannelId, topicId: pathTopicId } = useParams();

    const { channels } = useContext(MemberContext);
    const [topics, setTopics] = useState([]);

    const [currentChannel, setCurrentChannel] = useState({ id: null, name: null, thumbnail: null });
    const [currentTopic, setCurrentTopic] = useState({ id: null, title: null });

    const [messages, setMessages] = useState([]);
    const messageWebSocket = useWebSocket(
        (currentChannel.id && currentTopic.id)
            ? getWsBaseUrl() + `/chat/channel/${currentChannel.id}/topic/${currentTopic.id}`
            : null
    );

    // update channel by path params
    useEffect(() => {
        if (!channels?.length) {
            return;
        }
        console.log(`channels : ${JSON.stringify(channels)}`);

        const filtered = channels.filter(c => c.id == pathChannelId);
        if (!filtered?.length) {
            console.log(`channel arr with ${pathChannelId} is empty redirect to 404`);
            navigate("/404");
            return;
        }
        setCurrentChannel(filtered[0]);

        axiosClient
            .get(`/channel/${pathChannelId}/topic`)
            .then(({ data }) => {
                if (data.length) {
                    setTopics(data);
                    setCurrentTopic(data[0]);
                }
            });
    }, [channels, pathChannelId, setCurrentChannel, setTopics, navigate]);

    // update path param by context variable
    useEffect(() => {
        if (currentChannel.id && currentTopic.id) {
            navigate(`/channel/${currentChannel.id}/topic/${currentTopic.id}`);
        }
    }, [currentChannel, currentTopic, navigate]);

    return (
        <ChannelContext.Provider value={{
            topics,
            currentChannel,
            currentTopic,
            messageWebSocket,
            messages,
            setTopics,
            setCurrentChannel,
            setCurrentTopic,
            setMessages,
        }}>
            {children}
        </ChannelContext.Provider>
    );
};


export { ChannelContext, ChannelContextProvider };