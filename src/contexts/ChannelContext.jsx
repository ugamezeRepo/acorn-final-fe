import { getWsBaseUrl } from "@configs/env";
import { MemberContext } from "@contexts/MemberContext";
import { axiosClient } from "@utils/axiosClient";
import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";

const ChannelContext = createContext({
    topics: [],
    currentChannel: { id: null, name: null, thumbnail: null, inviteCode: null },
    currentTopic: { id: null, title: null },
    messages: [],
    lastJsonMessageOnWebSocket: null,
    sendJsonMessageOnWebSocket: () => { },
    setTopics: () => { },
    setCurrentChannel: () => { },
    setCurrentTopic: () => { },
    setMessages: () => { },
});


const ChannelContextProvider = ({ children }) => {
    const [topics, setTopics] = useState([]);

    const { channels } = useContext(MemberContext);
    const [currentChannel, setCurrentChannel] = useState({ id: null, name: null, thumbnail: null, inviteCode: null });
    const [currentTopic, setCurrentTopic] = useState({ id: null, title: null });
    const [messages, setMessages] = useState([]);


    const { sendJsonMessage: sendJsonMessageOnWebSocket, lastJsonMessage: lastJsonMessageOnWebSocket } = useWebSocket(
        (currentChannel?.id && currentTopic?.id)
            ? getWsBaseUrl() + `/chat/channel/${currentChannel.id}/topic/${currentTopic.id}`
            : null
    );

    useEffect(() => {
        if (channels?.length) {
            setCurrentChannel(channels[0]);
        }
    }, [channels, setCurrentChannel]);

    useEffect(() => {
        (async () => {
            if (!currentChannel.id) return;
            const { data: topics } = await axiosClient.get(`/channel/${currentChannel.id}/topic`);
            setTopics(topics);
            setCurrentTopic(topics[0]);
        })();
    }, [currentChannel, setTopics, setCurrentTopic]);

    useEffect(() => {
        (async () => {
            if (!currentChannel?.id || !currentTopic?.id) return;
            const { data: messages } = await axiosClient.get(`/channel/${currentChannel.id}/topic/${currentTopic.id}/message`);
            setMessages(messages);
        })();
    }, [currentTopic, currentChannel, setMessages]);

    return (
        <ChannelContext.Provider value={{
            topics,
            currentChannel,
            currentTopic,
            sendJsonMessageOnWebSocket,
            lastJsonMessageOnWebSocket,
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

ChannelContextProvider.propTypes = {
    children: PropTypes.element,
};

export { ChannelContext, ChannelContextProvider };