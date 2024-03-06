import { MemberContext } from "@contexts/MemberContext";
import styled from "@emotion/styled";
import { Avatar, Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, TextField } from "@mui/material";
import { axiosClient } from "@utils/axiosClient";
import { useContext, useState } from "react";



const MySettingProfileContainer = styled.div`
    width: 660px;
    min-width: 660px;
    height: 100vh;
    display: flex;
    flex-direction: column;
`;

const Banner = styled.div`
    width: 660px;
    height: 100px;
    border-radius: 8px 8px 0 0;
    background-color: #726e6d;
`;

const UserInfo = styled.div`
  width: 524px;
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 16px 0px 120px;
  margin-bottom: 10px;
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


const MySettingProfile = () => {

    const { nickname, hashtag, email, updateMyInfo } = useContext(MemberContext);

    const [nickTextShow, setnickTextShow] = useState(false);
    const [hashTextShow, sethashTextShow] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [ModalOpen, setModalOpen] = useState(false);
    const [newData, setNewData] = useState({
        nickname: nickname,
        hashtag: hashtag,
        email: email
    });

    const nickTextChange = (e) => {
        setNewData({
            ...newData,
            nickname: e.target.value
        });
        setSnackbarOpen(true);
    };

    const hashTextChange = (e) => {
        setNewData({
            ...newData,
            hashtag: Number(e.target.value)
        });
        setSnackbarOpen(true);
    };

    const updateSubmit = () => {
        setnickTextShow(false);
        sethashTextShow(false);
        axiosClient.put(`/member/changeNick`, newData)
            .then(res => {
                console.log(newData);
                console.log(res.data);
                updateMyInfo();
            })
            .catch(error => {
                console.log(error);
            });
        setSnackbarOpen(false);
    };

    const textfieldClose = () => {
        setnickTextShow(false);
        sethashTextShow(false);
        setSnackbarOpen(false);
    };

    const nickTextfieldClose = () => {
        setnickTextShow(false);
        setSnackbarOpen(false);
    };

    const hashTextfieldClose = () => {
        sethashTextShow(false);
        setSnackbarOpen(false);
    };

    const handleModalOpen = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    return (
        <>
            <MySettingProfileContainer>
                <h3>내계정</h3>
                <div style={{ position: "relative" }}>
                    <Banner />
                    <Container fixed sx={{
                        width: "660px",
                        minWidth: "660px",
                        bgcolor: "#dedede",
                        borderRadius: "0 0 2 2",
                        padding: 2,
                        margin: 0,
                    }}>
                        <UserInfo>
                            <Avatar sx={{
                                width: "80px",
                                height: "80px",
                                border: "3px solid rgba(0, 0, 0, 0.54)",
                                position: "absolute",
                                top: "55px",
                                left: "22px"
                            }}
                            >
                            </Avatar>
                            <div style={{ width: 300, fontSize: 20 }}>{nickname}</div>
                        </UserInfo>
                        <Box sx={{
                            bgcolor: "#ebedef",
                            borderRadius: 2,
                            margin: "8px 16px 16px 16px",
                            padding: "16px 16px 16px 16px",
                            display: "flex",
                            flexDirection: "column",
                        }}>
                            <ProfileContainer>
                                <div>
                                    <LabelContainer>nickname</LabelContainer>
                                    {nickTextShow ?
                                        <TextField
                                            defaultValue={nickname}
                                            size="small"
                                            name="nickname"
                                            onChange={nickTextChange}
                                            onBlur={nickTextfieldClose}
                                        />
                                        :
                                        <ContentContainer>{nickname}</ContentContainer>
                                    }
                                </div>
                                <Button
                                    variant="contained"
                                    size="small"
                                    sx={{ height: 35 }}
                                    onClick={() => setnickTextShow(true)}
                                >
                                    수정
                                </Button>
                            </ProfileContainer>
                            <ProfileContainer>
                                <div>
                                    <LabelContainer>user name</LabelContainer>
                                    {hashTextShow ?
                                        <div>
                                            <span>{nickname}</span>
                                            <TextField
                                                defaultValue={hashtag}
                                                size="small"
                                                name="hashtag"
                                                onChange={hashTextChange}
                                                onBlur={hashTextfieldClose}
                                            />
                                        </div>

                                        :
                                        <ContentContainer>{nickname + "_" + hashtag}</ContentContainer>
                                    }
                                </div>
                                <Button
                                    variant="contained"
                                    size="small"
                                    sx={{ height: 35 }}
                                    onClick={() => sethashTextShow(true)}
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
                </div>
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
                        onClick={handleModalOpen}
                    >
                        계정  삭제하기
                    </Button>
                </DeleteAccountContainer>
            </MySettingProfileContainer>
            <Snackbar
                open={snackbarOpen}
                message="저장하지 않은 변경사항이 있어요"
                action={
                    <>
                        <Button size="small" onClick={textfieldClose}>
                            재설정
                        </Button>
                        <Button size="small" onClick={updateSubmit} >
                            변경사항 저장하기
                        </Button>
                    </>
                }
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >

            </Snackbar>
            <Dialog
                open={ModalOpen}
                onClose={handleModalClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"계정 삭제하기"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        정말로 계정을 삭제하시겠어요? 즉시 계정에서 로그아웃되며
                        다시 로그인하실 수 없어요.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleModalClose}>취소</Button>
                    <Button onClick={handleModalClose} variant="contained" color="error" autoFocus>
                        계정삭제하기
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export { MySettingProfile };