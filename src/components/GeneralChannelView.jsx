import { BaseContainer } from "@components/basis/BaseContainer";
import { ChannelMain } from "@components/channel/main/ChannelMain";
import { ChannelNav } from "@components/channel/nav/ChannelNav";
import styled from "@emotion/styled";

const GeneralChannelViewContainer = styled(BaseContainer)`
    display:flex;
    overflow-x: hidden;
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