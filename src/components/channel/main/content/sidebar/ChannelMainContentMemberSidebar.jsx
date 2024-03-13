import { UserInfo } from "@components/channel/main/content/sidebar/UserInfo";
import { NAV_BG_COLOR } from "@configs/color";
import styled from "@emotion/styled";
import { PropTypes } from "prop-types";

const ChannelMainContentMemberSidebarContainer = styled.div`
    background-color: ${NAV_BG_COLOR};
    min-width: 240px;
    overflow-y: scroll;
    overflow-x:hidden;
    &::-webkit-scrollbar{
        width:0px;
    }
    & ul {
        padding:0 0 0 15px;
    }
`;

const ChannelMainContentMemberSidebar = () => {
    return (
        <ChannelMainContentMemberSidebarContainer>
            <UserInfo />
        </ChannelMainContentMemberSidebarContainer>
    );
};

ChannelMainContentMemberSidebar.propTypes = {
    showProfile: PropTypes.bool,
};

export { ChannelMainContentMemberSidebar };