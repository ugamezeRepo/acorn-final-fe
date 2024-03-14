import { ChannelContext } from "@contexts/ChannelContext";
import styled from "@emotion/styled";
import { Close } from "@mui/icons-material";
import { Button, IconButton, TextField } from "@mui/material";
import { axiosClient } from "@utils/axiosClient";
import { PropTypes } from "prop-types";
import { useContext, useState } from "react";

const CreateChannelContainer = styled.div`
    width: 350px;
    height: 250px;
    padding: 15px 20px 20px 20px ;
`;

const CreateTopic = ({ handleClose }) => {
    const { currentChannel, setTopics } = useContext(ChannelContext);
    const [title, setTitle] = useState("");

    const handleTitle = (e) => {
        setTitle(e.target.value);
    };

    const createTopic = async () => {
        const { data } = await axiosClient.post(`/channel/${currentChannel?.id}/topic`, {
            title: title
        });
        setTopics(topics => [...topics, data]);
        handleClose();
    };

    return (
        <CreateChannelContainer>
            <div style={{ display: "flex", justifyContent: "right" }}>
                <IconButton>
                    <Close onClick={handleClose} />
                </IconButton>
            </div>
            <h3 style={{ textAlign: "center", color: "#535252", marginTop: "10px" }}>토픽을 만들어보세요</h3>
            <TextField
                placeholder="토픽이름"
                size="small"
                sx={{ width: 310, marginBottom: "22px" }}
                name="title" value={title} onChange={handleTitle} autoFocus />
            <Button
                sx={{ width: 310, marginTop: 1, backgroundColor: "#456e2a", color: "#ececec" }}
                onClick={createTopic}
            >
                생성
            </Button>
        </CreateChannelContainer>
    );
};
CreateTopic.propTypes = {
    handleClose: PropTypes.func.isRequired,
};
export { CreateTopic };
