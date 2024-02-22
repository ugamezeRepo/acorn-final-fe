import styled from "@emotion/styled";
import { Button, FormControl, Input, InputLabel } from "@mui/material";

const EmailModalContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    position: relative;
    transform: translate(-50%, -50%);
    width: 500px;
    height: 400px;
    background-color: #ffffff;
    border: 2px solid #cecece;
    box-shadow: 24px;
    padding: 4px; 
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;



const MyPageEmailModal = ({ onClose }) => {
    return (
        <EmailModalContainer>
            <Button
                sx={{
                    minWidth: "30px",
                    height: "30px",
                    padding: 0,
                    margin: "10px 15px 10px 15px",
                    color: "gray",
                    right: "15px"
                }}
                onClick={onClose}
            >
                x
            </Button>
            <h3>이메일 주소 변경</h3>
            <p>새로운 이메일 주소를 입력하세요</p>
            <FormControl sx={{ width: 350 }}>
                <InputLabel>
                    이메일
                </InputLabel>
                <Input />
            </FormControl>
            <Button
                variant="contained"
                sx={{
                    minWidth: "60px",
                    height: "35px",

                }}
            >
                완료
            </Button>
        </EmailModalContainer>
    );
};
export { MyPageEmailModal };