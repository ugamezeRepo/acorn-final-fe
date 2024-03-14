import { ChannelContext } from "@contexts/ChannelContext";
import styled from "@emotion/styled";
import { Close } from "@mui/icons-material";
import { Button, IconButton, TextField } from "@mui/material";
import { axiosClient } from "@utils/axiosClient";
import { PropTypes } from "prop-types";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateChannelContainer = styled.div`
    width: 350px;
    height: 450px;
    padding: 15px 20px 20px 20px ;
`;

const SetTopic = ({ handleClose }) => {
    const { currentChannel, currentTopic, setCurrentTopic } = useContext(ChannelContext);
    const [title, setTitle] = useState(currentTopic.title || "");
    const navigate = useNavigate();

    const handleTopicName = (e) => {
        setTitle(e.target.value);
    };

    const ChangeTopicName = async () => {
        const { data } = await axiosClient.patch(`/channel/${currentChannel.id}/topic/${currentTopic.id}`, {
            id: currentTopic.id,
            title: title
        });
        setCurrentTopic(data);
        navigate(`/channel/${currentChannel.id}/topic/${currentTopic.id}`);
        handleClose();
    };

    const deleteTopic = async () => {
        await axiosClient.delete(`/channel/${currentChannel.id}/topic/${currentTopic.id}`);
        navigate(`/channel/${currentChannel.id}`);
        handleClose();
    };

    return (
        <>
            <CreateChannelContainer>
                <div style={{ display: "flex", justifyContent: "right" }}>
                    <IconButton>
                        <Close onClick={handleClose} />
                    </IconButton>
                </div>
                <h3 style={{ textAlign: "center", color: "#535252" }}>토픽이름 변경</h3>
                <TextField placeholder="토픽이름" size="small" sx={{ width: 310, marginBottom: "22px" }} value={title} onChange={handleTopicName} autoFocus />
                <Button
                    sx={{ width: 310, marginTop: 1, backgroundColor: "#456e2a", color: "#ececec" }}
                    onClick={ChangeTopicName}
                >
                    변경
                </Button>

                <hr style={{ marginTop: 15, marginBottom: 15 }} />

                <h3 style={{ textAlign: "center", color: "#535252" }}>토픽 삭제</h3>
                <h5 style={{ textAlign: "center", color: "#535252" }}>
                    토픽을 삭제하시겠습니까? <br /> 삭제 시 복구할 수 없습니다.
                </h5>
                <Button
                    sx={{ width: 310, marginTop: 1, backgroundColor: "#ee5757", color: "#ececec" }}
                    onClick={deleteTopic}
                >
                    삭제
                </Button>
            </CreateChannelContainer>
        </>
    );
};
SetTopic.propTypes = {
    handleClose: PropTypes.func.isRequired,
};
export { SetTopic };

