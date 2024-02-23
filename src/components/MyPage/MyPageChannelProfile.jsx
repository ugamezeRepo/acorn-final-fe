import { MyPageChannelSelect } from "@components/MyPage/MyPageChannelSelect";
import { MemberContext } from "@contexts/MemberContext";
import styled from "@emotion/styled";
import { Button, Snackbar, TextField } from "@mui/material";
import { useContext, useRef, useState } from "react";

const ChannelProfileContainer = styled.div`
    width:690px;
    padding: 60px 10px 80px 40px;
`;

const ChannelSelectContainer = styled.div`
    width: 600px;
    padding-bottom: 24px;
    border-bottom: 1px solid #cecece;
    margin-top: 16px;
    margin-bottom: 24px;
`;

const MyPageChannelProfile = () => {

    const { nickname } = useContext(MemberContext);

    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleSnackbarOpen = () => {
        setSnackbarOpen(true);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    let nicknameTextField = useRef();

    // const nicknameUpdate = () => {
    //     axios.patch("/member")
    // };

    return (
        <>
            <ChannelProfileContainer>
                <h3>프로필</h3>
                <ChannelSelectContainer>
                    <MyPageChannelSelect />
                </ChannelSelectContainer>
                <TextField
                    label="서버 별명"
                    defaultValue={nickname}
                    variant="standard"
                    onChange={handleSnackbarOpen}
                    ref={nicknameTextField}
                />
            </ChannelProfileContainer>
            <Snackbar
                open={snackbarOpen}
                message="저장하지 않은 변경사항이 있어요"
                action={
                    <>
                        <Button size="small" onClick={handleSnackbarClose}>
                            재설정
                        </Button>
                        <Button size="small" onClick={handleSnackbarClose}>
                            변경사항 저장하기
                        </Button>
                    </>
                }
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >

            </Snackbar>
        </>
    );
};
export { MyPageChannelProfile };
