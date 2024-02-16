import styled from "@emotion/styled";
import { BaseHeaderContainer } from "./BaseHeaderContainer";

const ChannelNavHeaderContainer = styled(BaseHeaderContainer)`
    flex-grow: 0; 
    flex-shrink: 0; 
    border-bottom: 1.5px solid #e3e3e3;

    display: flex;
`;

const ChannelLabel = styled.h3`
    margin: 0; 
    padding: 8px 12px; 
`;

const ChannelNavHeader = () => {
    return (
        <ChannelNavHeaderContainer>
            {/* todo: handle channel name with props */}
            <ChannelLabel>Channel Name Here</ChannelLabel>
        </ChannelNavHeaderContainer>
    );
};

export { ChannelNavHeader };