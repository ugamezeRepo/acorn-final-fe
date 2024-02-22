import { BaseContainer } from "@components/basis/BaseContainer";
import { ChannelContext } from "@contexts/ChannelContext";
import { MemberContext } from "@contexts/MemberContext";
import styled from "@emotion/styled";
import { AddCircle, EmojiEmotions } from "@mui/icons-material";
import { IconButton, Input } from "@mui/material";
import { Popover } from "@mui/material";
import EmojiPicker from "emoji-picker-react";
import PropTypes from "prop-types";
import { useContext, useState } from "react";


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

const ChannelMainMessageInput = ({ placeholder, setMessages }) => {
    const { nickname } = useContext(MemberContext);
    const { mesasgeWebSocket } = useContext(ChannelContext);
    const [message, setMessage] = useState("");
    const [emojiOpen, setEmojiOpen] = useState(false);
    const [uploadFile, setUploadFile] = useState(false);

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

                setMessages((msg) => {
                    return [...msg, {
                        content: message,
                        author: nickname,
                        createdAt: new Date().getTime(),
                    }];
                });
                setMessage("");
            }
            return;
        }
    };

    return (
        <ChannelMainMessageInputContainer>
            <ChannelMainMessageInputContent>
                <IconButton disableRipple onClick={() => setUploadFile(status => !status)} >
                    <AddCircle fontSize="large" />

                    <Popover open={uploadFile} anchorReference="anchorPosition"
                        anchorPosition={{ top: 760, left: 335 }}>
                        <FileUploadForm>
                            <FileUploadFormInner>파일 업로드</FileUploadFormInner>
                        </FileUploadForm>
                    </Popover>
                </IconButton>

                <Input fullWidth disableUnderline multiline
                    placeholder={placeholder}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={keyDownHandler} />

                <IconButton disableRipple onClick={() => setEmojiOpen(status => !status)}>
                    <EmojiEmotions fontSize="large" />

                    <EmojiPopOver open={emojiOpen} anchorReference="anchorPosition"
                        anchorPosition={{ top: 380, left: 1454 }}>
                        <EmojiPicker onEmojiClick={emojiClick} />
                    </EmojiPopOver>
                </IconButton>
            </ChannelMainMessageInputContent>
        </ChannelMainMessageInputContainer >
    );
};


ChannelMainMessageInput.propTypes = {
    placeholder: PropTypes.string,
    setMessages: PropTypes.func.isRequired,
};


const ChannelMainContentChatInputContainer = styled.div`
    min-height: 68px;

    flex-grow: 0;
    flex-shrink: 0; 
    display: flex;
`;


const ChannelMainContentChatInput = ({
    setMessages
}) => {
    return (
        <ChannelMainContentChatInputContainer>
            <ChannelMainMessageInput placeholder="#채널에 메시지 보내기" setMessages={setMessages} />
        </ChannelMainContentChatInputContainer>
    );
};


ChannelMainContentChatInput.propTypes = {
    // TODO: remove setmessage, make it connect to websocket
    setMessages: PropTypes.func.isRequired,
};
export { ChannelMainContentChatInput };