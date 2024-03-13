import { MemberContext } from "@contexts/MemberContext";
import styled from "@emotion/styled";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import { List } from "@mui/material";
import { axiosClient } from "@utils/axiosClient";
import { useContext, useEffect, useState } from "react";

const Content = styled.div`
width:100%;
height: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`;

const Text = styled.div`
    color:#e9e9e9;
`;

const FriendList = styled(List)`
    
`;
const FriendAll = () => {
    const { myInfo } = useContext(MemberContext);
    useEffect(() => {
        (async () => {
            const { data } = await axiosClient.get(`/friend/${myInfo.id}/list`);
            console.log(data);
        })();
    }, []);
    return (
        <>
            <Content>
                <CatchingPokemonIcon sx={{ fontSize: `200px`, color: `#f0f0f0` }}></CatchingPokemonIcon>
                <Text>너님의 친구리스트.</Text>
                <FriendList>

                </FriendList>
            </Content>
        </>
    );
};

export { FriendAll };