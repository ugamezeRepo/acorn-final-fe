
import { BaseContainer } from "@components/basis/BaseContainer";
import { MyPageMainHeader } from "@components/channel/main/MyPageMainHeader";
import styled from "@emotion/styled";
import AppleIcon from "@mui/icons-material/Apple";
import BlockIcon from "@mui/icons-material/Block";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import WavingHandIcon from "@mui/icons-material/WavingHand";
import { useState } from "react";

const MyPageMainCotainer = styled(BaseContainer)`
    background-color: #fff;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
`;
const Content = styled.div`
width:100%;
height: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;

`;
const ContentAdd = styled.div`
width:100%;
height: 100%;
padding-left: 20px;
display: flex;
flex-direction: column;
align-items: flex-start;
justify-content: flex-start;

`;
const Text = styled.div`
    color:#e9e9e9;
`;
const AddForm = styled.form`
    width: 100%;
`;
const AddInput = styled.input`
    width: 80%;
    height: 50px;
    border-radius: 5px;
`;

const AddBtn = styled.button`
    
`;

const MyPageMain = () => {
    const [content, setContent] = useState("default");

    const handleButtonClick = (addFriend) => {
        setContent(addFriend);
    };

    return (
        <MyPageMainCotainer>
            <MyPageMainHeader handleButtonClick={handleButtonClick} />


            {content === "default" && (
                <>
                    <Content>
                        <AppleIcon sx={{ fontSize: `200px`, color: `#f0f0f0` }}></AppleIcon>
                        <Text>아무도 님과 놀고 싶지 않은가 봐요.</Text>
                    </Content>
                </>
            )}
            {content === "online" && (
                <>
                    <Content>
                        <SentimentVeryDissatisfiedIcon sx={{ fontSize: `200px`, color: `#f0f0f0` }}></SentimentVeryDissatisfiedIcon>
                        <Text>아무도 안들어옴.</Text>
                    </Content>
                </>)}
            {content === "all" && (
                <>
                    <Content>
                        <CatchingPokemonIcon sx={{ fontSize: `200px`, color: `#f0f0f0` }}></CatchingPokemonIcon>
                        <Text>너님의 친구리스트.</Text>
                    </Content>
                </>
            )}
            {content === "standBy" && (
                <>
                    <Content>
                        <WavingHandIcon sx={{ fontSize: `200px`, color: `#f0f0f0` }}></WavingHandIcon>
                        <Text>대기 중인 친구 요청이 없음.</Text>
                    </Content>
                </>
            )}
            {content === "block" && (
                <>
                    <Content>
                        <BlockIcon sx={{ fontSize: `200px`, color: `#f0f0f0` }}></BlockIcon>
                        <Text>차단목록</Text>
                    </Content>
                </>
            )}
            {content === "addFriend" && (
                <>
                    <ContentAdd>
                        <h3>친구 추가하기</h3>
                        <AddForm onSubmit={() => { }}>
                            <h4>친구 아이디를 사용하여 친구를 추가할 수 있음</h4>
                            <AddInput type="text" placeholder="친구 추가 ㄱ" />
                            <AddBtn type="submit">친구 요청 보내기</AddBtn>
                        </AddForm>
                    </ContentAdd>
                </>
            )}

        </MyPageMainCotainer >
    );
};

export { MyPageMain };