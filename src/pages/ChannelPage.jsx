import { BaseContainer } from "@components/basis/BaseContainer";
import { GeneralChannelView } from "@components/GeneralChannelView";
import { GlobalChannelNav } from "@components/global-navigation/GlobalChannelNav";
import styled from "@emotion/styled";

const ChannelPageContainer = styled(BaseContainer)`
    display: flex;
`;

const ChannelPage = () => {
    return (
        <ChannelPageContainer>
            <GlobalChannelNav />
            <GeneralChannelView />
        </ChannelPageContainer>

    );
};

export { ChannelPage };