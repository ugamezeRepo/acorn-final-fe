import { BaseHeaderContainer } from "@components/basis/BaseHeaderContainer";
import { ChannelContext } from "@contexts/ChannelContext";
import styled from "@emotion/styled";
import { useContext } from "react";

const ChannelMainHeaderContainer = styled(BaseHeaderContainer)`
    flex-grow: 0; 
    flex-shrink: 0; 
    border-bottom: 1.5px solid #e3e3e3;
`;


const ChannelMainHeader = () => {
    const { topicName } = useContext(ChannelContext);
    return (
        <ChannelMainHeaderContainer>
            <h3>{topicName}</h3>
        </ChannelMainHeaderContainer>
    );
};

export { ChannelMainHeader };