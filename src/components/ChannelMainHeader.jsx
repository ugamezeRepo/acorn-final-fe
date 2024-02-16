import styled from "@emotion/styled";
import { BaseHeaderContainer } from "./BaseHeaderContainer";

const ChannelMainHeaderContainer = styled(BaseHeaderContainer)`
    flex-grow: 0; 
    flex-shrink: 0; 
    border-bottom: 1.5px solid #e3e3e3;
`;


const ChannelMainHeader = () => {
    return (
        <ChannelMainHeaderContainer>

        </ChannelMainHeaderContainer>
    );
};

export { ChannelMainHeader };