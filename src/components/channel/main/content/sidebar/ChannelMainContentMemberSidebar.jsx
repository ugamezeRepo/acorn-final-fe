import { UserInfo } from "@components/channel/main/content/sidebar/UserInfo";
import styled from "@emotion/styled";

const ChannelMainContentMemberSidebarContainer = styled.div`
    background-color: #f2f3f5;
    width: 240px;
    overflow-y: scroll;
    overflow-x:hidden;
     &::-webkit-scrollbar{
        width:0px;
    }
`;

const ChannelMainContentMemberSidebar = () => {
    return (
        <ChannelMainContentMemberSidebarContainer>
            <UserInfo />
        </ChannelMainContentMemberSidebarContainer>
    );
};

export { ChannelMainContentMemberSidebar };