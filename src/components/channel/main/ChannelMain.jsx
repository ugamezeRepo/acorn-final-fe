import { BaseContainer } from "@components/basis/BaseContainer";
import { ChannelMainContent } from "@components/channel/main/ChannelMainContent";
import { ChannelMainHeader } from "@components/channel/main/ChannelMainHeader";
import { ChannelMainInput } from "@components/channel/main/ChannelMainInput";
import styled from "@emotion/styled";
import { useState } from "react";

const ChannelMainContainer = styled(BaseContainer)`
    background-color: #fff;
    display: flex;
    flex-direction: column;
`;
const ChannelMain = () => {
    const [messages, setMessages] = useState([
        {
            author: "cloudchamb3r",
            content: "chat test",
            date: new Date().getTime()
        },
        {
            author: "cloudchamb3r",
            content: "chat test 222",
            date: new Date().getTime()
        },
        {
            author: "other",
            content: "how are you",
            date: new Date().getTime()
        },
        {
            author: "cloudchamb3r",
            content: "im fine thank you and you?",
            date: new Date().getTime()
        },
    ]);
    return (
        <ChannelMainContainer>
            <ChannelMainHeader />
            <ChannelMainContent messages={messages} />
            <ChannelMainInput setMessages={setMessages} />
        </ChannelMainContainer>
    );
};

export { ChannelMain };