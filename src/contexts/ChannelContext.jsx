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
    channelUsers: null,
    sendJsonMessageOnWebSocket: () => { },
    setTopics: () => { },
    setCurrentChannel: () => { },
    setCurrentTopic: () => { },
    setMessages: () => { },
});


const ChannelContextProvider = ({ children }) => {
    const { channels } = useContext(MemberContext);
    const [topics, setTopics] = useState(null);
    const [currentChannel, setCurrentChannel] = useState({ id: null, name: null, thumbnail: null, inviteCode: null });
    const [currentTopic, setCurrentTopic] = useState({ id: null, title: null });
    const [messages, setMessages] = useState([]);
    const [channelUsers, setChannelUsers] = useState([]);
    const { lastJsonMessage: webSocketChannelMemberStatus } = useWebSocket(
        (currentChannel && currentChannel.id)
            ? `${getWsBaseUrl()}/connection/channel/${currentChannel.id}/members`
            : null,
        {
            shouldReconnect: () => true,
            onError: (e) => {
                console.log(`ws error => ${e}`);
            }
        }
    );

    const { sendJsonMessage: sendJsonMessageOnWebSocket, lastJsonMessage: lastJsonMessageOnWebSocket } = useWebSocket(
        (currentChannel && currentTopic && currentChannel.id && currentTopic.id)
            ? getWsBaseUrl() + `/chat/channel/${currentChannel.id}/topic/${currentTopic.id}`
            : null,
        {
            shouldReconnect: () => true,
            onOpen: () => {
                console.log(`websocket connected : ${currentChannel.id} ${currentTopic.id}`);
            },
            onError: (e) => {
                console.log(`ws error => ${e}`);
            }
        }
    );

    useEffect(() => {
        if (channels == null || currentChannel == null) return;
        (async () => {
            const filteredChannel = channels.filter(c => c.id == currentChannel.id);
            if (JSON.stringify(currentChannel) != JSON.stringify(filteredChannel[0])) {
                setCurrentChannel(filteredChannel[0]);
            }
        })();
    }, [channels, currentChannel]);

    useEffect(() => {
        if (topics == null || currentTopic == null) return;
        (async () => {
            const filteredTopic = topics.filter(t => t.id == currentTopic.id);
            if (JSON.stringify(currentTopic) != JSON.stringify(filteredTopic[0])) {
                setCurrentTopic(filteredTopic[0]);
            }
        })();
    }, [topics, currentTopic]);


    useEffect(() => {
        setChannelUsers(webSocketChannelMemberStatus);
    }, [webSocketChannelMemberStatus, setChannelUsers]);

    return (
        <ChannelContext.Provider value={{
            topics,
            currentChannel,
            currentTopic,
            sendJsonMessageOnWebSocket,
            lastJsonMessageOnWebSocket,
            messages,
            channelUsers,
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