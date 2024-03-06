
import { BaseContainer } from "@components/basis/BaseContainer";
import { MyPageMainHeader } from "@components/channel/main/MyPageMainHeader";
import styled from "@emotion/styled";

const MyPageMainCotainer = styled(BaseContainer)`
    background-color: #fff;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
`;
const Content = styled.div`
`;
const Text = styled.div`
    color:#e9e9e9;
`;

const MyPageMain = () => {
    return (
        <MyPageMainCotainer>
            <MyPageMainHeader />

            <Content>
                <Text>아무도 님과 놀고 싶지 않은가 봐요.</Text>
            </Content>

        </MyPageMainCotainer>
    );
};

export { MyPageMain };