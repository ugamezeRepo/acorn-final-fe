import { ChannelMainContentChatView } from "@components/channel/main/content/chat/ChannelMainContentChatView";
import { ChannelMainContentMemberSidebar } from "@components/channel/main/content/sidebar/ChannelMainContentMemberSidebar";
import styled from "@emotion/styled";
import PropTypes from "prop-types";



const ChannelMainContentContainer = styled.div`
    display: flex; 
    justify-content: space-between;
    flex-grow: 1; 
    overflow: auto;
`;

const ChannelMainContent = ({
    messages,
    setMessages,
    memberSidebarOpen,
}) => {

    return (
        <ChannelMainContentContainer>
            <ChannelMainContentChatView messages={messages} setMessages={setMessages} />
            {memberSidebarOpen && <ChannelMainContentMemberSidebar memberSidebarOpen={memberSidebarOpen} messages={messages} />}
        </ChannelMainContentContainer >
    );
};

ChannelMainContent.propTypes = {
    messages: PropTypes.arrayOf(PropTypes.shape({
        author: PropTypes.string,
        content: PropTypes.string,
        date: PropTypes.number,
    })).isRequired,
    setMessages: PropTypes.func.isRequired,
    memberSidebarOpen: PropTypes.bool.isRequired,
};

export { ChannelMainContent };