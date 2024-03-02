import { BaseContainer } from "@components/basis/BaseContainer";
import { MySettingNav } from "@components/my-setting/MySettingNav";
import { MySettingProfile } from "@components/my-setting/MySettingProfile";
import styled from "@emotion/styled";
import { HighlightOffIcon } from "@mui/icons-material/HighlightOff";
import PropTypes from "prop-types";

const MySettingMainContainer = styled(BaseContainer)`
    background-color: #f2f3f5;
    display: flex;
    flex-direction: row;
    position: relative;
`;

const MySettingNavContainer = styled.div`
    min-width: 192px;
    width: 477px;
    background-color: #e2e4e7;
    display: flex;
    justify-content: flex-end;
`;

const MySettingProfileContainer = styled.div`
    min-width: 550px;
    width: 100%;
    padding: 60px 40px 80px 40px;
    display: flex;
    justify-content: flex-start;
    overflow-y: auto;
`;

const MySettingButtonContainer = styled.div`
    width: 36px;
    height: 56px;
    position: absolute;
    top: 60px;
    bottom: 586px;
    right: 283px;
    left: 1217px;
    display: flex;
    flex-direction: column;
`;


const MySetting = ({ onClose }) => {

    return (
        <MySettingMainContainer>
            <MySettingNavContainer>
                <MySettingNav />
            </MySettingNavContainer>
            <MySettingProfileContainer>
                <MySettingProfile />
            </MySettingProfileContainer>
            <MySettingButtonContainer onClick={onClose}>
                <HighlightOffIcon />
                <div
                    style={{
                        marginTop: "8px",
                        fontWeight: 600,
                        fontSize: "13px",
                        textAlign: "center"
                    }}
                >ESC</div>
            </MySettingButtonContainer>
        </MySettingMainContainer>
    );
};
export { MySetting };

MySetting.propTypes = {
    onClose: PropTypes.func.isRequired
};