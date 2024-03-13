
import { BaseContainer } from "@components/basis/BaseContainer";
import { MyPageMainHeader } from "@components/channel/main/MyPageMainHeader";
import { FriendAll } from "@components/my-setting/FriendAll";
import { StandBy } from "@components/my-setting/StandBy";
import { MemberContext } from "@contexts/MemberContext";
import styled from "@emotion/styled";
import AppleIcon from "@mui/icons-material/Apple";
import BlockIcon from "@mui/icons-material/Block";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { Autocomplete, Button, TextField } from "@mui/material";
import { axiosClient } from "@utils/axiosClient";
import { useContext, useEffect, useState } from "react";

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
    const { myInfo } = useContext(MemberContext);
    const [content, setContent] = useState("default");
    const [searchResults, setSearchResults] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [selectedFriendCandidate, setSelectedFriendCandidate] = useState(null);

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
                    <FriendAll />
                </>
            )}
            {content === "standBy" && (
                <>
                    <StandBy />
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
                                    onInput={(e) => {
                                        console.log("search text : " + e.target.value);
                                        setSearchText(e.target.value);
                                    }}
                                />}
                                getOptionLabel={(opt) => {
                                    return `${opt.nickname} #${opt.hashtag}`;
                                }}
                            />
                            <Button variant="contained" onClick={async () => {
                                if (!selectedFriendCandidate) return;
                                const { data } = await axiosClient.post("/friend/request", {
                                    fromId: myInfo.id,
                                    toId: selectedFriendCandidate.id,
                                });
                                console.log("friend request result => " + data);
                            }}>친구 요청 보내기</Button>

                        </div>
                    </ContentAdd>
                </>
            )}

        </MyPageMainCotainer >
    );
};

export { MyPageMain };