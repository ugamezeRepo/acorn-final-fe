import { axiosClient } from "@configs/AxiosClient";
import { MemberContext } from "@contexts/MemberContext";
import styled from "@emotion/styled";
import { Avatar, Box, Button, Container, Snackbar, TextField } from "@mui/material";
import { useContext, useRef, useState } from "react";



const MyPageProfileContainer = styled.div`
    width: 660px;
    height: 100vh;
    padding: 60px 40px 80px 40px;
    display: flex;
    flex-direction: column;
`;

const UserInfo = styled.div`
  width: 550px;
  height: 72px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 35px 16px 12px;
`;

const ProfileContainer = styled.div`
    margin-top: 10px;
    margin-bottom: 24px;
    display: flex;
`;

const LabelContainer = styled.div`
    width: 400px;
    font-size: 12px;
    color: "#b5bac1";
`;

const ContentContainer = styled.div`
    width: 400px;
    font-size: 16px;
    color: "#f2f3f5";
`;

const DeleteAccountContainer = styled.div`
    width: 660px;
    height: 120px;
    margin-top: 40px;
    display: flex;
    flex-direction: column;
`;


const MyPageProfile = () => {

    const { nickname, email } = useContext(MemberContext);

    const [nicknameUpdate, setNicknameUpdate] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const newNicknameRef = useRef();

    const handleSnackBarOpen = () => {
        setSnackbarOpen(true);
    };
    const nicknameSubmit = () => {
        setSnackbarOpen(false);
        setNicknameUpdate(false);
        let newNickname = "newnickname";

        axiosClient.put(`/member/changeNick`, {
            email: email,
            nickname: newNickname
        });

    };

    const handleTextfieldClose = () => {
        setNicknameUpdate(false);
        setSnackbarOpen(false);
    };

    const handleTextfieldOpen = () => {
        setNicknameUpdate(true);
    };

    return (
        <>
            <MyPageProfileContainer>
                <h3>내계정</h3>
                <Container fixed sx={{
                    bgcolor: "#dedede",
                    borderRadius: 2,
                    padding: 3
                }}>
                    <UserInfo>
                        <Avatar sx={{
                            width: 80,
                            height: 80,
                            border: "3px solid rgba(0, 0, 0, 0.54)"
                        }}
                        >
                        </Avatar>
                        <div style={{ width: 300, fontSize: 20 }}>{nickname}</div>
                        <Button
                            variant="contained"
                            size="medium"
                            sx={{ height: 35 }}
                            onClick={handleTextfieldOpen}
                        >
                            프로필 편집
                        </Button>
                    </UserInfo>
                    <Box sx={{
                        bgcolor: "#ebedef",
                        borderRadius: 2,
                        margin: 2,
                        padding: 2,
                        display: "flex",
                        flexDirection: "column",
                    }}>
                        <ProfileContainer>
                            <div>
                                <LabelContainer>nickname</LabelContainer>
                                {nicknameUpdate ? <TextField
                                    defaultValue={nickname}
                                    size="small"
                                    onChange={handleSnackBarOpen}
                                    onBlur={handleTextfieldClose}
                                    ref={newNicknameRef}
                                />
                                    :
                                    <ContentContainer>{nickname}</ContentContainer>
                                }
                            </div>
                            <Button
                                variant="contained"
                                size="small"
                                sx={{ height: 35 }}
                                onClick={handleTextfieldOpen}
                            >
                                수정
                            </Button>
                        </ProfileContainer>
                        <ProfileContainer>
                            <div>
                                <LabelContainer>Email</LabelContainer>
                                <ContentContainer>{email}</ContentContainer>
                            </div>
                        </ProfileContainer>
                    </Box>
                </Container>
                <DeleteAccountContainer>
                    <h3>계정제거</h3>
                    <Button
                        variant="contained"
                        color="error"
                        size="small"
                        sx={{
                            width: 120,
                            height: 35
                        }}
                    >
                        계정  삭제하기
                    </Button>
                </DeleteAccountContainer>
            </MyPageProfileContainer>
            <Snackbar
                open={snackbarOpen}
                message="저장하지 않은 변경사항이 있어요"
                action={
                    <>
                        <Button size="small" onClick={handleTextfieldClose}>
                            재설정
                        </Button>
                        <Button size="small" onClick={nicknameSubmit} >
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

export { MyPageProfile };