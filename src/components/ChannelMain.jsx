import styled from "@emotion/styled";
import { BaseContainer } from "./BaseContainer";
import { ChannelMainHeader } from "./ChannelMainHeader";
import { ChannelMainContent } from "./ChannelMainContent";
import { ChannelMainInput } from "./ChannelMainInput";

const ChannelMainContainer = styled(BaseContainer)`
    background-color: #fff;
    display: flex;
    flex-direction: column;
`;
const ChannelMain = () => {
    return (
        <ChannelMainContainer>
            <ChannelMainHeader />
            <ChannelMainContent />
            <ChannelMainInput />
        </ChannelMainContainer>
    );
};

export { ChannelMain };