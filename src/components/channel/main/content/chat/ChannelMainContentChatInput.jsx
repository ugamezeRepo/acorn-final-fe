import { BaseContainer } from "@components/basis/BaseContainer";
import { ChannelContext } from "@contexts/ChannelContext";
import { MemberContext } from "@contexts/MemberContext";
import styled from "@emotion/styled";
import { AddCircle, EmojiEmotions } from "@mui/icons-material";
import { IconButton, Input } from "@mui/material";
import { Popover } from "@mui/material";
import EmojiPicker from "emoji-picker-react";
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";


const ChannelMainMessageInputContainer = styled(BaseContainer)`
    margin-left: 24px;
    margin-right: 24px;
    
    
    display: flex;
`;

const ChannelMainMessageInputContent = styled.div`
    width: 100%;
    background-color: #ebedef;
    margin-bottom: 24px;
    border-radius: 12px;
    padding-left: 12px;
    padding-right: 12px;

    display: flex;
`;

const FileUploadForm = styled.div`
    width:180px;
    height:70px;
    background-color:#bbbbbb;
    padding:6px;
`;

const FileUploadFormInner = styled.div`
    width:100%;
    height:100%;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
        background-color:#fff0f0;
    }
`;
const EmojiPopOver = styled(Popover)`
    width:500px;
    height:600px;
`;

const ChannelMainMessageInput = ({ placeholder }) => {
    const [fileUploadModalAnchor, setFileUploadModalAnchor] = useState(null);
    const [emojiModalAnchor, setEmojiModalAnchor] = useState(null);

    const { nickname, hashtag } = useContext(MemberContext);
    const { sendJsonMessageOnWebSocket, lastJsonMessageOnWebSocket, setMessages } = useContext(ChannelContext);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (lastJsonMessageOnWebSocket) {
            const { body } = lastJsonMessageOnWebSocket;
            if (body === null) return;
            console.log(JSON.stringify(body));
            const { job, messageDto } = body;
            const { id, author, content, createdAt } = messageDto;

            if (job === "insert") {
                setMessages(msgs => [...msgs, {
                    id,
                    author,
                    content,
                    createdAt,
                }]);
            }
            if (job === "update") {
                setMessages(msgs => msgs.map(msg => {
                    if (msg.id === id) {
                        return {
                            id, author, content, createdAt
                        };
                    }
                    return msg;
                }));
            }
            if (job === "delete") {
                console.log(`receive delete message => ${id}`);
                setMessages(msgs => msgs.filter(msg => msg.id !== id));
            }
        }
    }, [lastJsonMessageOnWebSocket, setMessages]);

    const emojiClick = ({ emoji }) => {
        setMessage((msg) => msg + emoji);
    };

    /**
     * 
     * @param {React.KeyboardEvent} e 
     */
    const keyDownHandler = (e) => {
        if (!e.shiftKey && e.key === "Enter") {
            e.preventDefault();
            if (message) {
                sendJsonMessageOnWebSocket({
                    job: "insert",
                    messageDto: {
                        author: {
                            nickname,
                            hashtag
                        },
                        content: message,
                    }
                });
                setMessage("");
            }
            return;
        }
    };
    const handleOpenFileUploadModal = (e) => {
        setFileUploadModalAnchor(e.currentTarget);
    };

    const handleCloseFileUploadModal = () => {
        setFileUploadModalAnchor(null);
    };

    const handleOpenEmojiModal = (e) => {
        setEmojiModalAnchor(e.currentTarget);
    };

    const handleCloseEmojiModal = () => {
        setEmojiModalAnchor(null);
    };

    const openFileUploadModal = Boolean(fileUploadModalAnchor);
    const openEmojiModal = Boolean(emojiModalAnchor);
    return (
        <ChannelMainMessageInputContainer>
            <ChannelMainMessageInputContent>
                <IconButton disableRipple onClick={handleOpenFileUploadModal} >
                    <AddCircle fontSize="large" />
                </IconButton>
                <Input fullWidth disableUnderline multiline
                    placeholder={placeholder}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={keyDownHandler} />
                <IconButton disableRipple onClick={handleOpenEmojiModal}>
                    <EmojiEmotions fontSize="large" />
                </IconButton>
            </ChannelMainMessageInputContent>

            <Popover
                open={openFileUploadModal}
                onClose={handleCloseFileUploadModal}
                anchorEl={fileUploadModalAnchor}
                anchorOrigin={{ vertical: -80, horizontal: "left" }}>
                <FileUploadForm>
                    <FileUploadFormInner>이미지 업로드</FileUploadFormInner>
                </FileUploadForm>
            </Popover>

            <EmojiPopOver
                open={openEmojiModal}
                onClose={handleCloseEmojiModal}
                anchorEl={emojiModalAnchor}
                anchorOrigin={{ vertical: -460, horizontal: "right" }}>
                <EmojiPicker open={true} onEmojiClick={emojiClick} />
            </EmojiPopOver>
        </ChannelMainMessageInputContainer >
    );
};


ChannelMainMessageInput.propTypes = {
    placeholder: PropTypes.string
};

const ChannelMainContentChatInputContainer = styled.div`
    min-height: 68px;

    flex-grow: 0;
    flex-shrink: 0; 
    display: flex;
`;


const ChannelMainContentChatInput = () => {
    return (
        <ChannelMainContentChatInputContainer>
            <ChannelMainMessageInput placeholder="#채널에 메시지 보내기" />
        </ChannelMainContentChatInputContainer>
    );
};


ChannelMainContentChatInput.propTypes = {
    // TODO: remove setmessage, make it connect to websocket

};
export { ChannelMainContentChatInput };