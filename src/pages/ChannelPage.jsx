import { BaseContainer } from "@components/BaseContainer";
import { GeneralChannelView } from "@components/GeneralChannelView";
import { GlobalChannelNav } from "@components/GlobalChannelNav";
import { ChannelContextProvider } from "@contexts/ChannelContext";
import styled from "@emotion/styled";

const ChannelPageContainer = styled(BaseContainer)`
    display: flex;
`;

const ChannelPage = () => {
    return (
        <ChannelContextProvider>
            <ChannelPageContainer>
                <GlobalChannelNav />
                <GeneralChannelView />
            </ChannelPageContainer>
        </ChannelContextProvider>
    );
};

export { ChannelPage };