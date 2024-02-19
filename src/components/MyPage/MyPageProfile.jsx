import { BaseContainer } from "@components/basis/BaseContainer";
import { MemberContext } from "@contexts/MemberContext";
import styled from "@emotion/styled";
import { Avatar, Box, Container } from "@mui/material";
import { useContext } from "react";

const MyPageProfileContainer = styled(BaseContainer)`
    display: flex;
    flex-direction: column;
`;

const labelContainer = styled.div`
    width: 100px;
`;

const contentContainer = styled.div`
    width:100px;
`;



const MyPageProfile = () => {

    const {nickname, email} = useContext(MemberContext);

    return(
        <MyPageProfileContainer>
            <h3>내계정</h3>
            <Container fixed sx={{
                bgcolor:"#c3c1c1ede",
                borderRadius: 2
            }}>
                <Avatar sx={{
                    width: 30,
                    height: 30
                }}
                >
                    T
                </Avatar>

                <Box sx={{
                    bgcolor: "#ebedef",
                    borderRadius: 2,
                    display: "flex",
                    flexDirection: "column"
                }}>
                    <div>
                        <labelContainer>별명</labelContainer>
                        <contentContainer>{nickname}</contentContainer>
                    </div>
                    <div>
                        <labelContainer>이메일</labelContainer>
                        <contentContainer>{email}</contentContainer>
                    </div>
                </Box>
                
            </Container>
        </MyPageProfileContainer>

    );
};
export {MyPageProfile};