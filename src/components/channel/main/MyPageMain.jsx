
import { BaseContainer } from "@components/basis/BaseContainer";
import { MyPageMainHeader } from "@components/channel/main/MyPageMainHeader";
import styled from "@emotion/styled";
import AppleIcon from "@mui/icons-material/Apple";
import BlockIcon from "@mui/icons-material/Block";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import WavingHandIcon from "@mui/icons-material/WavingHand";
import { Autocomplete, Button, TextField } from "@mui/material";
import { axiosClient } from "@utils/axiosClient";
import { useEffect, useState } from "react";

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

const MyPageMain = () => {
    const [content, setContent] = useState("default");
    const [searchResults, setSearchResults] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [_selectedFriendCandidate, setSelectedFriendCandidate] = useState(null);

    useEffect(() => {
        (async () => {
            const { data } = await axiosClient.get(`/friend/search?keyword=${searchText}`);
            console.log(data);
            setSearchResults(data);
        })();
    }, [searchText]);

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
                        <h4>친구 닉네임을 통해 친구를 검색해보세요</h4>
                        <div style={{ display: "flex", width: "100%" }}>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={searchResults}
                                sx={{ width: "80%" }}
                                onChange={(ev, val) => {
                                    console.log(` val => ${JSON.stringify(val)}`);
                                    setSearchText("");
                                    setSearchResults([]);
                                    setSelectedFriendCandidate(val);
                                }}
                                renderInput={(params) => <TextField
                                    {...params}
                                    placeholder="친구 닉네임을 입력해주세요"
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)}
                                />}
                                getOptionLabel={(opt) => {
                                    return `${opt.nickname} #${opt.hashtag}`;
                                }}
                            />
                            <Button variant="contained" type="submit">친구 요청 보내기</Button>

                        </div>
                    </ContentAdd>
                </>
            )}

        </MyPageMainCotainer >
    );
};

export { MyPageMain };