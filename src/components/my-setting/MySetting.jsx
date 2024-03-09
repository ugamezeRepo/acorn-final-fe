import { BaseContainer } from "@components/basis/BaseContainer";
import { MySettingNav } from "@components/my-setting/MySettingNav";
import { MySettingProfile } from "@components/my-setting/MySettingProfile";
import styled from "@emotion/styled";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import PropTypes from "prop-types";

const MySettingMainContainer = styled(BaseContainer)`
    width: 100%;
    height: 100%;
    padding: 40px 80px 40px 80px;
    background-color: #fff6ef;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const MySettingNavContainer = styled.div`
    min-width: 192px;
    width: 300px;
    height: 600px;
    background-color: #ffffff;
    margin-right: 80px;
    padding: 5px;
`;

const MySettingProfileContainer = styled.div`
    min-width: 550px;
    width: 550px;
    height: 600px;
    background-color: #ffffff;
    padding: 15px;
`;

const MySettingButtonContainer = styled.div`
    width: 36px;
    height: 56px;
    position: absolute;
    top: 60px;
    bottom: 586px;
    right: 283px;
    left: 1350px;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
`;


const MySetting = ({ close }) => {


    return (
        <MySettingMainContainer>
            <MySettingNavContainer>
                <MySettingNav />
            </MySettingNavContainer>
            <MySettingProfileContainer>
                <MySettingProfile />
            </MySettingProfileContainer>
            <MySettingButtonContainer onClick={close}>
                <HighlightOffIcon sx={{ color: "#707070" }} />
                <div
                    style={{
                        marginTop: "8px",
                        fontWeight: 600,
                        fontSize: "13px",
                        textAlign: "center",
                        color: "#707070"
                    }}
                >ESC</div>
            </MySettingButtonContainer>
        </MySettingMainContainer>
    );
};
export { MySetting };

MySetting.propTypes = {
    close: PropTypes.func.isRequired
};