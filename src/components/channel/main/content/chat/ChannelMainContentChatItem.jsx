import { CHATTING_BG_HOVER_COLOR } from "@configs/color";
import { ChannelContext } from "@contexts/ChannelContext";
import { MemberContext } from "@contexts/MemberContext";
import styled from "@emotion/styled";
import { Delete, Edit } from "@mui/icons-material";
import { Avatar, Box, IconButton, Input, ListItem, Popper } from "@mui/material";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { useContext, useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";


const AvatarView = styled.div`
    width: 48px;
`;

const ContentView = styled.div`
    width: 60%;
`;

const AuthorInfo = styled.div`
    display: flex;
`;

const ContentMarkdown = styled(Markdown)`
    & p {
        line-height: 1;
        word-wrap: break-word;
    }
    & p img {
        width:60%;
    }
    & pre code {
        white-space: pre-wrap;
        word-wrap: break-word;
    }
`;

const ChatItem = styled(ListItem)``;

const PopperButton = styled(IconButton)`
    &:hover {
        background-color: #eaebed;
    }
    border-radius: 2px;
`;

const ChannelMainContentChatItem = ({
    msg,
    showProfile
}) => {
    const { myInfo } = useContext(MemberContext);
    const { sendJsonMessageOnWebSocket } = useContext(ChannelContext);

    const [openPopper, setOpenPopper] = useState(false);
    const [popperAnchor, setPopperAnchor] = useState(null);
    const [isEditing, setEditing] = useState(false);
    const [content, setContent] = useState(msg.content);

    const chatItemRef = useRef(null);

    useEffect(() => {
        setContent(msg.content);
    }, [msg, setContent]);

    const listStyle = showProfile
        ? { alignItems: "normal", display: "flex", padding: "20px 16px 0" }
        : { alignItems: "normal", display: "flex", padding: "0 16px" };

    const handleMouseOver = () => {
        setOpenPopper(true);
        setPopperAnchor(chatItemRef.current);
    };

    const handleMouseLeave = () => {
        setOpenPopper(false);
    };

    const handleEditClick = () => {
        setEditing(true);

    };
    const handleEditEnd = () => {
        sendJsonMessageOnWebSocket({
            job: "update",
            messageDto: {
                id: msg.id,
                author: {
                    id: myInfo.id,
                    nickname: myInfo.nickname,
                    hashtag: myInfo.hashtag
                },
                content,
            }
        });
        setEditing(false);
    };

    const checkAdmin = () => {
        // TODO: check admin by channel role 
        return true;
    };

    const handleDeleteClick = () => {
        sendJsonMessageOnWebSocket({
            job: "delete",
            messageDto: {
                id: msg.id,
                author: {
                    id: myInfo.id,
                    nickname: myInfo.nickname,
                    hashtag: myInfo.hashtag
                },
            }
        });
    };

    return (
        <ChatItem sx={{ ...listStyle, bgcolor: openPopper ? CHATTING_BG_HOVER_COLOR : null }}
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
            ref={chatItemRef}
        >
            <AvatarView >
                {showProfile && <Avatar />}
            </AvatarView>

            <ContentView onBlurCapture={handleEditEnd}>
                {showProfile && <AuthorInfo>
                    <div style={{ fontWeight: 700, paddingRight: "8px" }}>{msg.author.nickname}</div>
                    <div> {dayjs(msg.createdAt).format("YYYY" + "년 " + "MM" + "월 " + "DD" + "일 " + "HH" + "시 " + "MM" + "분 " + "ss" + "초")}</div><br />
                </AuthorInfo>}
                {
                    isEditing
                        ? <Input autoFocus value={content} onChange={(e) => setContent(e.target.value)} ></Input>
                        : <ContentMarkdown remarkPlugins={[remarkGfm]}>
                            {content}
                        </ContentMarkdown>
                }

            </ContentView>

            <Popper open={openPopper} anchorEl={popperAnchor} placement="top-end" sx={{ bgcolor: "white" }}>
                <Box sx={{ border: 0.5, borderColor: "#eaebed", borderRadius: "8px", display: "flex" }}>
                    {
                        // TODO: change user verification logic
                        (myInfo.id === msg.author.id) &&
                        <PopperButton disableRipple onClick={handleEditClick}>
                            <Edit sx={{ color: "#313338" }} />
                        </PopperButton>
                    }
                    {
                        (myInfo.id === msg.author.id || checkAdmin()) &&
                        < PopperButton disableRipple onClick={handleDeleteClick}>
                            <Delete sx={{ color: "#da373c" }} />
                        </PopperButton>
                    }
                </Box>
            </Popper>
        </ChatItem >
    );
};


ChannelMainContentChatItem.propTypes = {
    msg: PropTypes.object,
    showProfile: PropTypes.bool
};

export { ChannelMainContentChatItem };