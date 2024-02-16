import styled from "@emotion/styled";

import { MessageInput } from "./MessageInput";

const ChannelMainInputContainer = styled.div`
    width: 100%;
    min-height: 68px;

    flex-grow: 0;
    flex-shrink: 0; 

    display: flex;
`;


const ChannelMainInput = () => {
    return (
        <ChannelMainInputContainer>
            <MessageInput placeholder="#채널에 메시지 보내기" />
        </ChannelMainInputContainer>
    );
};

export { ChannelMainInput };