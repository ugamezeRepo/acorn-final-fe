import { BaseContainer } from "@components/basis/BaseContainer";
import { GlobalChannelNav } from "@components/global-navigation/GlobalChannelNav";
import { MyChannelView } from "@components/MyChannelView";
import { AppContextProvider } from "@contexts/AppContextProvider";
import styled from "@emotion/styled";

const MyChannelPageContainer = styled(BaseContainer)`
    display: flex; 
`;

const MyChannelPage = () => {
    return (
        <AppContextProvider>
            <MyChannelPageContainer>
                <GlobalChannelNav />
                <MyChannelView />
            </MyChannelPageContainer>
        </AppContextProvider>
    );
};

export { MyChannelPage };