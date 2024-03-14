import { MemberContext } from "@contexts/MemberContext";
import styled from "@emotion/styled";
import { Close } from "@mui/icons-material";
import { Button, IconButton, TextField } from "@mui/material";
import { axiosClient } from "@utils/axiosClient";
import { PropTypes } from "prop-types";
import { useContext, useState } from "react";

const CreateChannelContainer = styled.div`
    width: 350px;
    height: 500px;
    padding: 20px;
`;

const CreateChannel = ({ handleClose }) => {
    const { myInfo, updateMyInfo } = useContext(MemberContext);
    const [serverName, setServerName] = useState("");

    const handleServerName = (e) => {
        setServerName(e.target.value);
    };

    const createChannel = async () => {
        await axiosClient.post("/channel", {
            name: serverName,
            thumbnail: "",
            nickname: myInfo.nickname,
            hashtag: myInfo.hashtag,
        });
        updateMyInfo();
        handleClose();
    };
    return (
        <CreateChannelContainer>
            <div style={{ display: "flex", justifyContent: "right" }}>
                <IconButton>
                    <Close onClick={handleClose} />
                </IconButton>
            </div>
            <h3 style={{ textAlign: "center", color: "#535252" }}>채널을 만들어보세요</h3>
            <h5 style={{ textAlign: "center", color: "#535252" }}>채널은 나와 친구들이 함께 어울리는 공간입니다. <br /> 채널을 만들고 대화를 시작해보세요.</h5>
            <TextField placeholder="채널이름" name="serverName" size="small" sx={{ width: 310 }} value={serverName} onChange={handleServerName} />
            <Button sx={{ width: 310, marginTop: 1, backgroundColor: "#456e2a", color: "#ececec" }} onClick={createChannel}>생성</Button>

            <hr style={{ marginTop: 15, marginBottom: 15 }} />

            <h3 style={{ textAlign: "center", color: "#535252" }}>초대장을 받으셨나요?</h3>
            <TextField placeholder="초대코드(ex.13352ea2-c8d1-4c0b-a57a-6568f0726407)" size="small" sx={{ width: 310 }} />
            <Button sx={{ width: 310, marginTop: 1, backgroundColor: "#456e2a", color: "#ececec" }}>입장</Button>
        </CreateChannelContainer>
    );
};
CreateChannel.propTypes = {
    handleClose: PropTypes.func.isRequired,
};
export { CreateChannel };
