import { MemberContext } from "@contexts/MemberContext";
import styled from "@emotion/styled";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { Button, List, ListItem } from "@mui/material";
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

const FriendListAll = styled(List)`
    width: 100%;
    padding:20px;
    & > span {
        text-indent: 10px;
    }
`;

const FriendList = styled(ListItem)`
    width: 100%;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    
    &:hover {
        background-color: #f7f7f7;
    }
`;
const Online = () => {
    const { myInfo } = useContext(MemberContext);
    const [List, setList] = useState([]);


    useEffect(() => {
        (async () => {
            const { data } = await axiosClient.get(`/friend/${myInfo.id}/list`);
            setList(data);
        })();
    }, [myInfo.id]);

    return (
        <>

            {List.length === 0 ? (
                <>
                    <ContentOne>
                        <SentimentVeryDissatisfiedIcon sx={{ fontSize: `200px`, color: `#f0f0f0` }}></SentimentVeryDissatisfiedIcon>
                        <Text>아무도 안들어옴.</Text>
                    </ContentOne>
                </>
            ) : (
                <>
                    <ContentTwo>
                        <FriendListAll>
                            <span>온라인</span>
                            <hr />
                            {List.map((req, idx) => (
                                req.status === "online" && (
                                    <FriendList key={idx}>
                                        <span>{req.nickname}</span>
                                    </FriendList>
                                )
                            ))}
                            <span>오프라인</span>
                            <hr />
                            {List.map((req, idx) => (
                                req.status === "offline" && (
                                    <FriendList key={idx}>
                                        <span>{req.nickname}</span>
                                    </FriendList>
                                )
                            ))}
                        </FriendListAll>
                    </ContentTwo>
                </>
            )}
        </>
    );
};

export { Online };