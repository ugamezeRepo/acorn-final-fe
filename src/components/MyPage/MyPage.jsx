import { BaseContainer } from "@components/basis/BaseContainer";
import { MyPageNav } from "@components/MyPage/MyPageNav";
import { MyPageProfile } from "@components/MyPage/MyPageProfile";
import styled from "@emotion/styled";
import { Box } from "@mui/material";

const MyPageMainContainer = styled(BaseContainer)`
    background-color: #fff;
    display: flex;
    flex-direction: row;
`;


const MyPage = () => {
    return (
        <Box sx={{
            width:600,
            height:600
        }}>
            <MyPageMainContainer>
                <MyPageNav />
                <MyPageProfile />
            </MyPageMainContainer>
        </Box>
    );
};
export { MyPage };