import styled from "@emotion/styled";
import { BaseContainer } from "./BaseContainer";

const ChannelNavMainContainer = styled(BaseContainer)`
    flex-grow: 1;
    flex-shrink: 1;
`;

const ChannelNavMain = () => {
    return (
        <ChannelNavMainContainer>
            this is channel nav main
        </ChannelNavMainContainer>
    );
};

export { ChannelNavMain };