import { ChannelMainContentChatInput } from "@components/channel/main/content/chat/ChannelMainContentChatInput";
import { ChannelMainContentChatItem } from "@components/channel/main/content/chat/ChannelMainContentChatItem";
import { ChannelContext } from "@contexts/ChannelContext";
import styled from "@emotion/styled";
import { List } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";


const ChannelMainContentList = styled(List)`
    max-height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    flex-grow: 1; 
    flex-shrink: 1;
    &::-webkit-scrollbar{
        width:10px;
        height:10px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #747474;
        border-radius: 6px;
        background-clip: padding-box;
        border: 2px solid transparent;
        min-height: 50px;
    }
    &::-webkit-scrollbar-thumb:hover {
        background-color: #222222;
    }
    &::-webkit-scrollbar-track {
        background-color:transparent;
    }
    &::-webkit-scrollbar-button{
    }
    &::-webkit-scrollbar-corner{
        background: transparent;
    }
`;

const ChannelMainContentChatViewContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1; 
    flex-shrink: 1;
    min-width: 456px;

`;

const ChannelMainContentChatView = () => {
    /**
     * @type {React.RefObject<HTMLDivElement>}
     */
    const endOfMessageRef = useRef(null);
    const chatListRef = useRef(null);
    const { messages } = useContext(ChannelContext);
    const firstLoading = useRef(true);

    useEffect(() => {
        if (messages.length === 0) return;
        const chatList = chatListRef.current;
        if (chatList) {
            if (firstLoading.current || chatList.scrollHeight - chatList.scrollTop <= 1500) {
                endOfMessageRef.current?.scrollIntoView();
                firstLoading.current = false;
            }
        }
    }, [messages]);

    return (
        <ChannelMainContentChatViewContainer>

            <ChannelMainContentList ref={chatListRef}>
                {messages.map((msg, idx) => {
                    return (
                        <ChannelMainContentChatItem
                            key={idx}
                            msg={msg}
                            showProfile={
                                idx === 0 ||
                                messages[idx - 1].author.email !== messages[idx].author.email
                            } />
                    );
                })}
                <div ref={endOfMessageRef}></div>
            </ChannelMainContentList>
            <ChannelMainContentChatInput />
        </ChannelMainContentChatViewContainer >
    );
};

export { ChannelMainContentChatView };