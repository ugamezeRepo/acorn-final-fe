import { MemberContext } from "@contexts/MemberContext";
import styled from "@emotion/styled";
import WavingHandIcon from "@mui/icons-material/WavingHand";
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

const StandByList = styled(List)`
    width: 100%;
    padding:0;
`;
const MyStandByList = styled(ListItem)`
    width: 100%;
    background-color: #f7f7f7;
    padding: 10px;
    margin-bottom: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease;
    display: flex;
    justify-content: space-between;
    
    &:hover {
        background-color: #e0e0e0;
    }
`;
const StandBy = () => {
    const { myInfo } = useContext(MemberContext);
    const [request, setRequest] = useState([]);


    useEffect(() => {
        (async () => {
            const { data } = await axiosClient.get(`/friend/request`, {
                params: {
                    toId: myInfo.id
                }
            });
            setRequest(data);
        })();
    }, [myInfo.id]);


    const acceptFriendRequest = async (req) => {
        await axiosClient.post(`/friend/answer`, {
            toId: myInfo.id,
            fromId: req.id,
            answer: "yes"
        });
        setRequest(request => request.filter(item => item.id != req.id));
    };
    const denyFriendRequest = async (req) => {
        await axiosClient.post(`/friend/answer`, {
            toId: myInfo.id,
            fromId: req.id,
            answer: "no"
        });
        setRequest(request => request.filter(item => item.id != req.id));
    };

    return (
        <>

            {request.length === 0 ? (
                <>
                    <ContentOne>
                        <WavingHandIcon sx={{ fontSize: `200px`, color: `#f0f0f0` }}></WavingHandIcon>
                        <Text>대기 중인 친구 요청이 없음.</Text>
                    </ContentOne>
                </>
            ) : (
                <>
                    <ContentTwo>
                        <StandByList>
                            {request.map((req, idx) => (
                                <MyStandByList key={idx}>
                                    <span>{idx + 1} ) {req.nickname} # {req.hashtag} 님의 요청</span>
                                    <div>

                                        <Button onClick={() => acceptFriendRequest(req)}>수락</Button>
                                        <Button onClick={() => denyFriendRequest(req)}>거절</Button>
                                    </div>
                                </MyStandByList>
                            ))}
                        </StandByList>
                    </ContentTwo>
                </>
            )}
        </>
    );
};

export { StandBy };