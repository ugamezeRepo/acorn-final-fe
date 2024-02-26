
import { BaseContainer } from "@components/basis/BaseContainer";
import { ChannelMainContent } from "@components/channel/main/content/ChannelMainContent";
import { ChannelMainHeader } from "@components/channel/main/header/ChannelMainHeader";
import { axiosClient } from "@configs/AxiosClient";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ChannelMainContainer = styled(BaseContainer)`
    background-color: #fff;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
`;

const ChannelMain = () => {
    const { channelId, topicId } = useParams();

    useEffect(() => {
        (async () => {
            const { data: chatList } = await axiosClient.get(`/channel/${channelId}/topic/${topicId}/message`);
            console.log(chatList);
        })();

    }, [channelId, topicId]);

    const [memeberSidebarOpen, setMemberSidebarOpen] = useState(false);

    return (
        <ChannelMainContainer>
            <ChannelMainHeader setMemberSidebarOpen={setMemberSidebarOpen} />
            <ChannelMainContent memberSidebarOpen={memeberSidebarOpen} />
        </ChannelMainContainer>
    );
};

export { ChannelMain };