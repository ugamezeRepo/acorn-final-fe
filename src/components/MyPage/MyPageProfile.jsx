import { MemberContext } from "@contexts/MemberContext";
import styled from "@emotion/styled";
import { Avatar, Box, Button, Container } from "@mui/material";
import { useContext } from "react";

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
  padding: 16px 12px 16px 12px;
`;

const ProfileContainer = styled.div`
    margin-top: 10px;
    margin-bottom: 24px;
`;

const LabelContainer = styled.div`
    width: 520px;
    font-size: 12px;
    color: "#b5bac1";
`;

const ContentContainer = styled.div`
    width: 520px;
    font-size: 16px;
    color: "#f2f3f5";
`;



const MyPageProfile = ({ showChannelProfile }) => {

    const { nickname, email } = useContext(MemberContext);

    return (
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
                        T
                    </Avatar>
                    <div style={{ width: 300, fontSize: 20 }}>{nickname}</div>
                    <Button variant="contained" size="medium" sx={{ height: 35 }} onClick={showChannelProfile}>
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
                        <LabelContainer>별명</LabelContainer>
                        <ContentContainer>{nickname}</ContentContainer>
                    </ProfileContainer>
                    <ProfileContainer>
                        <LabelContainer>이메일</LabelContainer>
                        <ContentContainer>{email}</ContentContainer>
                    </ProfileContainer>
                </Box>

            </Container>
        </MyPageProfileContainer>

    );
};
export { MyPageProfile };