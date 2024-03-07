import { MemberContext } from "@contexts/MemberContext";
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { axiosClient } from "@utils/axiosClient";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const DmContainer = styled.div`
padding:10px;
border-radius: 5px;
`;
const DmModal = ({ selectedUser, onClose }) => {
    const { id } = useContext(MemberContext);
    const [dmTopic, setDmTopic] = useState(null);
    const navigate = useNavigate();

    const DirectMessage = async () => {
        await axiosClient.post(`/channel/@me/`, {
            member1Id: id,
            member2Id: selectedUser.id
        }).then((res) => {
            setDmTopic(res.data);
            onClose();
            navigate(`/channel/@me/${dmTopic}`);
        });
    };

    return (
        <>
            <DmContainer>
                <Button onClick={DirectMessage}>메세지 보내기</Button>
            </DmContainer>
        </>
    );
};

DmModal.propTypes = {
    selectedUser: PropTypes.object,
    onClose: PropTypes.func.isRequired
};

export { DmModal };
