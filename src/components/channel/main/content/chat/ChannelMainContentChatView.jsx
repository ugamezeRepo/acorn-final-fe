import { ChannelMainContentChatInput } from "@components/channel/main/content/chat/ChannelMainContentChatInput";
import { ChannelMainContentChatItem } from "@components/channel/main/content/chat/ChannelMainContentChatItem";
import styled from "@emotion/styled";
import { List } from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useRef } from "react";


const ChannelMainContentList = styled(List)`
    max-height: 100%;
    overflow: auto;
    flex-grow: 1; 
    flex-shrink: 1;
`;

const ChannelMainContentChatViewContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1; 
    flex-shrink: 1;
    min-width: 456px;

`;

const ChannelMainContentChatView = ({ messages, setMessages }) => {
    /**
     * @type {React.RefObject<HTMLDivElement>}
     */
    const endOfMessage = useRef(null);


    useEffect(() => {
        console.log("end of message use effect called ");
        endOfMessage.current?.scrollIntoView();
    }, [endOfMessage, messages]);

    return (
        <ChannelMainContentChatViewContainer>
            <ChannelMainContentList>
                {messages.map((msg, idx) => {
                    return (
                        <ChannelMainContentChatItem key={idx}
                            msg={msg}
                            showProfile={
                                idx === 0 ||
                                messages[idx - 1].author !== messages[idx].author
                            } />
                    );
                })}
                <div ref={endOfMessage}></div>
            </ChannelMainContentList>
            <ChannelMainContentChatInput setMessages={setMessages} />
        </ChannelMainContentChatViewContainer >
    );
};

ChannelMainContentChatView.propTypes = {
    messages: PropTypes.arrayOf(PropTypes.shape({
        author: PropTypes.string,
        content: PropTypes.string,
        date: PropTypes.number,
    })).isRequired,
    setMessages: PropTypes.func.isRequired,
};

export { ChannelMainContentChatView };