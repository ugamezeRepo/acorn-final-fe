import { MemberContext } from "@contexts/MemberContext";
import styled from "@emotion/styled";
import { axiosClient } from "@utils/axiosClient";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const InviteContainer = styled.div`
    height:100vh;
    display: flex;
    background-color: #d6d6d6;
`;

const InviteModal = styled.div`
    width:30%;
    text-align:center;
    margin:auto;
    padding:32px;
    background-color: #313338;
    color: white;
    box-shadow: 0px 0px 3px #303030;
`;

const InvitePage = () => {
    const { inviteCode } = useParams();
    const [name, setName] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        (async () => {
            const { data } = await axiosClient.post(`/channel/invite/${inviteCode}`);
            setName(data.name);
            setThumbnail(data.thumbnail);
        })();
    }, [inviteCode]);

    const joinChannel = async () => {
        console.log("join channel clicked!");
        const { data } = await axiosClient.post(`/channel/join/${inviteCode}`);
        if (data) {
            navigate(`/channel/${data.id}`);
        }
    };

    return (
        <InviteContainer>
            <InviteModal>
                <div>
                    <div>{thumbnail}</div>
                    <h3>{name}</h3>
                </div>
                <button onClick={joinChannel}>초대 수락하기</button>
            </InviteModal>
        </InviteContainer>
    );
};
export { InvitePage };
