import { BaseHeaderContainer } from "@components/basis/BaseHeaderContainer";
import { ChannelContext } from "@contexts/ChannelContext";
import styled from "@emotion/styled";
import { useContext } from "react";

const ChannelNavHeaderContainer = styled(BaseHeaderContainer)`
    flex-grow: 0; 
    flex-shrink: 0; 
    border-bottom: 1.5px solid #e3e3e3;

    display: flex;
    align-items: center;
    padding: 16px;
`;

const ChannelLabel = styled.h3`
    margin: 0; 
    padding: 8px 12px; 
`;

const ChannelNavHeader = () => {
    const { channelName } = useContext(ChannelContext);
    return (
        <ChannelNavHeaderContainer>
            <ChannelLabel>{channelName}</ChannelLabel>
        </ChannelNavHeaderContainer>
    );
};

export { ChannelNavHeader };