import { BaseContainer } from "@components/basis/BaseContainer";
import { MemberContext } from "@contexts/MemberContext";
import styled from "@emotion/styled";
import { AddCircle } from "@mui/icons-material";
import { IconButton, Input } from "@mui/material";
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
const ChannelMainMessageInput = ({ placeholder, setMessages }) => {
    const { nickname } = useContext(MemberContext);
    const [message, setMessage] = useState("");


    /**
     * 
     * @param {React.KeyboardEvent} e 
     */
    const keyDownHandler = (e) => {
        if (!e.shiftKey && message && e.key === "Enter") {
            e.preventDefault();

            setMessages((msg) => {
                return [...msg, {
                    content: message,
                    author: nickname,
                    date: new Date().getTime(),
                }];
            });
            setMessage("");
            return;
        }
    };
    return (
        <ChannelMainMessageInputContainer>
            <ChannelMainMessageInputContent>
                <IconButton disableRipple >
                    <AddCircle fontSize="large" />
                </IconButton>
                <Input fullWidth disableUnderline multiline
                    placeholder={placeholder}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={keyDownHandler} />
            </ChannelMainMessageInputContent>

        </ChannelMainMessageInputContainer>
    );
};

ChannelMainMessageInput.propTypes = {
    placeholder: PropTypes.string,
    setMessages: PropTypes.func.isRequired,
};

const ChannelMainInputContainer = styled.div`
    width: 100%;
    min-height: 68px;

    flex-grow: 0;
    flex-shrink: 0; 

    display: flex;
`;


const ChannelMainInput = ({
    setMessages
}) => {
    return (
        <ChannelMainInputContainer>
            <ChannelMainMessageInput placeholder="#채널에 메시지 보내기" setMessages={setMessages} />
        </ChannelMainInputContainer>
    );
};


ChannelMainInput.propTypes = {
    // TODO: remove setmessage, make it connect to websocket
    setMessages: PropTypes.func.isRequired,
};
export { ChannelMainInput };