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
    min-width:192px;
    height: 100vh;
    padding:60px 20px 60px 6px;
    background-color: #f2f3f5;
    flex: 1;
    display: flex;
    justify-content: center;
`;

const MyPageProfileContainer = styled.div`
    min-width: 700px;
    flex: 3;
    display: flex;
    justify-content: center;
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
            <MyPageProfileContainer>
                {showComponent ? (
                    <MyPageProfile showChannelProfile={showChannelProfile} />
                ) : (
                    <MyPageChannelProfile />
                )}
            </MyPageProfileContainer>
        </MyPageMainContainer>
    );
};
export { MyPage };