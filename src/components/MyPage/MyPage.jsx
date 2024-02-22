import { BaseContainer } from "@components/basis/BaseContainer";
import { MyPageChannelProfile } from "@components/MyPage/MyPageChannelProfile";
import { MyPageNav } from "@components/MyPage/MyPageNav";
import { MyPageProfile } from "@components/MyPage/MyPageProfile";
import styled from "@emotion/styled";
import { useState } from "react";


const MyPageMainContainer = styled(BaseContainer)`
    background-color: #fff;
    display: flex;
    flex-direction: row;
`;

const MyPageNavContainer = styled.div`
    width:192px;
    height: 100vh;
    padding:60px 20px 60px 6px;
    background-color: #f2f3f5;
`;


const MyPage = () => {
    const [showComponent, setShowComponent] = useState(true);

    const showProfile = () => {
        setShowComponent(true);
    };

    const showChannelProfile = () => {
        setShowComponent(false);
    };


    return (
        <MyPageMainContainer>
            <MyPageNavContainer>
                <MyPageNav showProfile={showProfile} showChannelProfile={showChannelProfile} />
            </MyPageNavContainer>
            {showComponent ? (
                <MyPageProfile showChannelProfile={showChannelProfile} />
            ) : (
                <MyPageChannelProfile />
            )}
        </MyPageMainContainer>
    );
};
export { MyPage };