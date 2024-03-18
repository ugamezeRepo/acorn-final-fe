import { ChannelMainContentChatView } from "@components/channel/main/content/chat/ChannelMainContentChatView";
import { ChannelMainContentRtcView } from "@components/channel/main/content/rtc/ChannelMainContentRtcView";
import { ChannelMainContentMemberSidebar } from "@components/channel/main/content/sidebar/ChannelMainContentMemberSidebar";
import { ChannelContext } from "@contexts/ChannelContext";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { useContext } from "react";




const ChannelMainContentContainer = styled.div`
    display: flex; 
    justify-content: space-between;
    flex-grow: 1; 
    overflow: auto;
`;

const ChannelMainContent = ({
    memberSidebarOpen,
}) => {
    const { currentTopic } = useContext(ChannelContext);
    return (
        <ChannelMainContentContainer>
            {!currentTopic.isRtcChannel && <ChannelMainContentChatView />}
            {currentTopic.isRtcChannel && <ChannelMainContentRtcView />}
            {memberSidebarOpen && <ChannelMainContentMemberSidebar memberSidebarOpen={memberSidebarOpen} />}
        </ChannelMainContentContainer >
    );
};

ChannelMainContent.propTypes = {
    memberSidebarOpen: PropTypes.bool.isRequired,
};

export { ChannelMainContent };