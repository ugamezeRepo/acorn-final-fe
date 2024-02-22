import styled from "@emotion/styled";
import { Avatar, ListItem } from "@mui/material";
import { PropTypes } from "prop-types";

const ChannelMainContentMemberSidebarContainer = styled.div`
    background-color: #f2f3f5;
    width: 240px;
`;

const ContentView = styled.div`
    
`;

const AuthorInfo = styled.div`
    display: flex;
`;

const ChannelMainContentMemberSidebar = ({
    msg,
    showProfile
}) => {
    return (
        <ChannelMainContentMemberSidebarContainer>
            <ListItem>
                <Avatar>
                    {showProfile && <Avatar />}
                </Avatar>
                <ContentView>
                    {showProfile && <AuthorInfo>
                        {msg.author}
                    </AuthorInfo>}
                </ContentView>
            </ListItem>

            <div>오프라인</div>
        </ChannelMainContentMemberSidebarContainer>
    );
};

ChannelMainContentMemberSidebar.propTypes = {
    msg: PropTypes.shape({
        author: PropTypes.string,
        content: PropTypes.string,
        date: PropTypes.number,
    }).isRequired,
    showProfile: PropTypes.bool,
};

export { ChannelMainContentMemberSidebar };