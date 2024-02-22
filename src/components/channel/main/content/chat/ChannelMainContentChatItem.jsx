import styled from "@emotion/styled";
import { Avatar, ListItem } from "@mui/material";
import PropTypes from "prop-types";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const AvatarView = styled.div`
    width: 48px;
`;

const ContentView = styled.div`
    
`;

const AuthorInfo = styled.div`
    display: flex;
`;

const ContentMarkdown = styled(Markdown)`
    & p {
        line-height: 1;
    }
`;

const ChannelMainContentChatItem = ({
    msg,
    showProfile
}) => {

    const listStyle = showProfile
        ? { alignItems: "normal", display: "flex", padding: "20px 16px 0" }
        : { alignItems: "normal", display: "flex", padding: "0 16px" };

    return (
        <ListItem sx={listStyle}>
            <AvatarView >
                {showProfile && <Avatar />}
            </AvatarView>

            <ContentView>
                {showProfile && <AuthorInfo>
                    <div style={{ fontWeight: 700, paddingRight: "8px" }}>{msg.author.nickname}</div>
                    <div>{msg.createdAt[0]}년 {msg.createdAt[1]}월 {msg.createdAt[2]}일 {msg.createdAt[3]}시 {msg.createdAt[4]}분 {msg.createdAt[5]}초</div>
                </AuthorInfo>}
                <ContentMarkdown remarkPlugins={[remarkGfm]}>
                    {msg.content}
                </ContentMarkdown>
            </ContentView>
        </ListItem>
    );
};

ChannelMainContentChatItem.propTypes = {
    msg: PropTypes.shape({
        author: PropTypes.object,
        content: PropTypes.string,
        createdAt: PropTypes.array,
    }).isRequired,
    showProfile: PropTypes.bool,
};

export { ChannelMainContentChatItem };