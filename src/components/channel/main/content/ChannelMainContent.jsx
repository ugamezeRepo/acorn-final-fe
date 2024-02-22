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
    memberSidebarOpen,
}) => {

    return (
        <ChannelMainContentContainer>
            <ChannelMainContentChatView />
            {memberSidebarOpen && <ChannelMainContentMemberSidebar memberSidebarOpen={memberSidebarOpen} />}
        </ChannelMainContentContainer >
    );
};

ChannelMainContent.propTypes = {
    memberSidebarOpen: PropTypes.bool.isRequired,
};

export { ChannelMainContent };