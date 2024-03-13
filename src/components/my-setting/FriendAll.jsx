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
    padding:0;
`;

const MyFriendList = styled(ListItem)`
    width: 100%;
    background-color: #f7f7f7;
    padding: 10px;
    margin-bottom: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease;
    
    &:hover {
        background-color: #e0e0e0;
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
    }, []);
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