import { BaseContainer } from "@components/basis/BaseContainer";
import { GlobalChannelNav } from "@components/global-navigation/GlobalChannelNav";
import { MyChannelView } from "@components/MyChannelView";
import { MemberContext } from "@contexts/MemberContext";
import styled from "@emotion/styled";
import { useContext, useEffect } from "react";

const MyChannelPageContainer = styled(BaseContainer)`
    display: flex; 
`;

const MyChannelPage = () => {
    const { updateMyInfo } = useContext(MemberContext);
    useEffect(() => {
        console.count("my channel page update my info");
        updateMyInfo();
    }, [updateMyInfo]);
    return (
        <MyChannelPageContainer>
            <GlobalChannelNav />
            <MyChannelView />
        </MyChannelPageContainer>

    );
};

export { MyChannelPage };