import { BaseContainer } from "@components/basis/BaseContainer";
import { GlobalChannelNav } from "@components/global-navigation/GlobalChannelNav";
import { MyChannelView } from "@components/MyChannelView";
import styled from "@emotion/styled";

const MyChannelPageContainer = styled(BaseContainer)`
    display: flex; 
`;

const MyChannelPage = () => {
    return (
        <MyChannelPageContainer>
            <GlobalChannelNav />
            <MyChannelView />
        </MyChannelPageContainer>
    );
};

export { MyChannelPage };