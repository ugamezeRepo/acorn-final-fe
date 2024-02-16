import { BaseContainer } from "@components/basis/BaseContainer";
import { GeneralChannelView } from "@components/GeneralChannelView";
import { GlobalChannelNav } from "@components/global-navigation/GlobalChannelNav";
import { AppContextProvider } from "@contexts/AppContextProvider";
import styled from "@emotion/styled";

const ChannelPageContainer = styled(BaseContainer)`
    display: flex;
`;

const ChannelPage = () => {
    return (
        <AppContextProvider>
            <ChannelPageContainer>
                <GlobalChannelNav />
                <GeneralChannelView />
            </ChannelPageContainer>
        </AppContextProvider>
    );
};

export { ChannelPage };