import { BaseContainer } from "@components/basis/BaseContainer";
import { GeneralChannelView } from "@components/GeneralChannelView";
import { GlobalChannelNav } from "@components/global-navigation/GlobalChannelNav";
import { ChannelContext } from "@contexts/ChannelContext";
import { MemberContext } from "@contexts/MemberContext";
import styled from "@emotion/styled";
import { axiosClient } from "@utils/axiosClient";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ChannelPageContainer = styled(BaseContainer)`
    display: flex;
`;

const ChannelPage = () => {
    const { channelId, topicId } = useParams();
    const { setCurrentChannel, setCurrentTopic, setTopics, setMessages } = useContext(ChannelContext);
    const { updateMyInfo } = useContext(MemberContext);

    useEffect(() => {
        if (!channelId) return;

        (async () => {
            setCurrentChannel({ id: channelId });
            const { data: topics } = await axiosClient.get(`/channel/${channelId}/topic`);
            setTopics(topics);
            setCurrentTopic(topicId ? { id: topicId } : topics[0]);
            const currentTopicId = topicId ? topicId : topics[0].id;
            const { data: msgs } = await axiosClient.get(`/channel/${channelId}/topic/${currentTopicId}/message`);
            setMessages(msgs);
        })();
    }, [channelId, topicId, setCurrentChannel, setTopics, setCurrentTopic, setMessages]);

    useEffect(() => {
        console.count("update my info on channel page");
        updateMyInfo();
    }, [updateMyInfo]);

    return (
        <ChannelPageContainer>
            <GlobalChannelNav />
            <GeneralChannelView />
        </ChannelPageContainer>
    );
};

export { ChannelPage };