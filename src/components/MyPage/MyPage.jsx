import { BaseContainer } from "@components/basis/BaseContainer";
import { MyPageNav } from "@components/MyPage/MyPageNav";
import { MyPageProfile } from "@components/MyPage/MyPageProfile";
import styled from "@emotion/styled";


const MyPageMainContainer = styled(BaseContainer)`
    background-color: #f2f3f5;
    display: flex;
    flex-direction: row;
`;

const MyPageNavContainer = styled.div`
    min-width: 192px;
    width: 477px;
    background-color: #e2e4e7;
    display: flex;
    justify-content: flex-end;
`;

const MyPageProfileContainer = styled.div`
    min-width: 550px;
    width: 100%;
    padding: 60px 40px 80px 40px;
    display: flex;
    justify-content: flex-start;
    overflow-y: auto;
`;


const MyPage = () => {

    return (
        <MyPageMainContainer>
            <MyPageNavContainer>
                <MyPageNav />
            </MyPageNavContainer>
            <MyPageProfileContainer>
                <MyPageProfile />
            </MyPageProfileContainer>
        </MyPageMainContainer>
    );
};
export { MyPage };