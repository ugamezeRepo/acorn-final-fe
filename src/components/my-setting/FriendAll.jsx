import { MemberContext } from "@contexts/MemberContext";
import styled from "@emotion/styled";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import { List, ListItem } from "@mui/material";
import { axiosClient } from "@utils/axiosClient";
import { useContext, useEffect, useState } from "react";

const ContentOne = styled.div`
    width:100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const ContentTwo = styled.div`
    width:100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
`;


const Text = styled.div`
    color:#e9e9e9;
`;

const FriendList = styled(List)`
    width: 100%;
    padding:20px;
    & > span {
        text-indent: 10px;
    }
`;

const MyFriendList = styled(ListItem)`
    width: 100%;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    
    &:hover {
        background-color: #f7f7f7;
    }
`;
const FriendAll = () => {
    const { myInfo } = useContext(MemberContext);
    const [friendList, setFriendList] = useState([]);
    useEffect(() => {
        (async () => {
            const { data } = await axiosClient.get(`/friend/${myInfo.id}/list`);
            setFriendList(data);
        })();
    }, [myInfo.id]);
    return (
        <>

            {friendList.length === 0 ? (
                <>
                    <ContentOne>
                        <CatchingPokemonIcon sx={{ fontSize: `200px`, color: `#f0f0f0` }}></CatchingPokemonIcon>
                        <Text>너님의 친구리스트.</Text>
                    </ContentOne>
                </>
            ) : (
                <>
                    <ContentTwo>
                        <FriendList>
                            <span>모든 친구</span>
                            <hr />
                            {friendList.map((fl, idx) => (
                                <MyFriendList key={idx}>
                                    <span>{idx + 1}) {fl.nickname} / #{fl.hashtag}</span>
                                </MyFriendList>
                            ))}
                        </FriendList>
                    </ContentTwo>
                </>
            )}
        </>
    );
};

export { FriendAll };