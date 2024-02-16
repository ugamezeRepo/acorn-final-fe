import styled from "@emotion/styled";
import { BaseContainer } from "./BaseContainer";
import { ChannelNav } from "./ChannelNav";
import { ChannelMain } from "./ChannelMain";

const GeneralChannelViewContainer = styled(BaseContainer)`
    display:flex;
    background-color: yellow;
`;

const GeneralChannelView = () => {
    return (
        <GeneralChannelViewContainer>
            <ChannelNav />
            <ChannelMain />
        </GeneralChannelViewContainer>
    );
};

export { GeneralChannelView };