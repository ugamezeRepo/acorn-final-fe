
import { axiosClient } from "@components/AxiosClient";
import { BaseContainer } from "@components/basis/BaseContainer";
import { ChannelMainContent } from "@components/channel/main/content/ChannelMainContent";
import { ChannelMainHeader } from "@components/channel/main/header/ChannelMainHeader";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ChannelMainContainer = styled(BaseContainer)`
    background-color: #fff;
    display: flex;
    flex-direction: column;
`;

const ChannelMain = () => {
    const [messages, setMessages] = useState([]);
    const { channelId, topicId } = useParams();

    useEffect(() => {
        (async () => {
            const { data: chatList } = await axiosClient.get(`/channel/${channelId}/topic/${topicId}/message`);
            setMessages(chatList);
        })();

    }, [channelId, topicId, setMessages]);
    console.log(messages);
    // todo axios request 
    const [memeberSidebarOpen, setMemberSidebarOpen] = useState(false);

    return (
        <ChannelMainContainer>
            <ChannelMainHeader setMemberSidebarOpen={setMemberSidebarOpen} />
            <ChannelMainContent messages={messages} setMessages={setMessages} memberSidebarOpen={memeberSidebarOpen} />
        </ChannelMainContainer>
    );
};

export { ChannelMain };