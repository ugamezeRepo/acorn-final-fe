import maindotori from "@assets/maindotori.png";
import { getHttpBaseUrl } from "@configs/env";
import styled from "@emotion/styled";
import { Button } from "@mui/material";
const LoginPageContainer = styled.div`
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const DotoriContainer = styled.div`
    font-optical-sizing: auto;
    font-weight: 500;
    font-size: 130px;
    font-style: normal;
    font-variation-settings:
        "wdth" 100;
    line-height: 0.7;
    margin-bottom:60px;
`;

const GoogleLoginButton = styled(Button)`
    width: 340px;
    height: 60px;
    background-color: #ffdc81;
    color: #5F3518;
    font-size: 20px;
    font-weight: 500;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px; ;
`;


const LoginPage = () => {

    const handleGoogleLoginButtonClick = () => {
        location.href = `${getHttpBaseUrl()}/oauth2/authorization/google`;
    };
    return (
        <LoginPageContainer>
            <div style={{ marginTop: 150 }}>
                <img src={maindotori} alt="" width="110px" height="150px" />
            </div>
            <DotoriContainer>Dotori</DotoriContainer>
            <div style={{ color: "#787878", marginBottom: 40, textAlign: "center" }}>
                아이디와 비밀번호 입력하기 귀찮으시죠?
                <br />
                구글 아이디로 간편하게 로그인 하세요.
            </div>
            <GoogleLoginButton onClick={handleGoogleLoginButtonClick}>Login</GoogleLoginButton>
        </LoginPageContainer >
    );
};
export { LoginPage };