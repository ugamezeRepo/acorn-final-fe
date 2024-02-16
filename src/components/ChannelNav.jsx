import styled from "@emotion/styled";
import { BaseContainer } from "./BaseContainer";
import { ChannelNavHeader } from "./ChannelNavHeader";
import { ChannelNavMain } from "./ChannelNavMain";
import { ChannelNavMyStatus } from "./ChannelNavMyStatus";

const ChannelNavContainer = styled(BaseContainer)`
    max-width: 240px;

    display: flex;
    flex-direction: column;
    background-color: #f2f3f5;
`;

const ChannelNav = () => {
    return (
        <ChannelNavContainer>
            <ChannelNavHeader />
            <ChannelNavMain />
            <ChannelNavMyStatus />
        </ChannelNavContainer>
    );
};

export { ChannelNav };