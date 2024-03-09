import maindotori from "@assets/maindotori.png";
import { LogoutModal } from "@components/my-setting/LogoutModal";
import { MemberContext } from "@contexts/MemberContext";
import styled from "@emotion/styled";
import { PersonOutline } from "@mui/icons-material";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useContext, useState } from "react";

const AccountInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 30px 20px 10px 20px;
`;

const ProfileImageContainer = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: #F5F5F1;
    margin: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ProfileTextContainer = styled.div`
    color: #707070;
    text-align: center;
    margin-left: 10px;
    margin-right: 10px;
`;

const LogoutTextContainer = styled.div`
    color: #707070;
    text-decoration: underline;
    height: 100px;
    text-align: center;
    cursor: pointer;
`;

const MySettingNav = () => {
    const { nickname, email } = useContext(MemberContext);
    const [logoutOpen, setLogoutOpen] = useState(false);

    const handleOpen = () => {
        setLogoutOpen(true);
    };

    const handleClose = () => {
        setLogoutOpen(false);
    };

    return (
        <>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <AccountInfoContainer>
                    <ProfileImageContainer>
                        <img src={maindotori} alt="" style={{ width: 100, height: 150 }} />
                    </ProfileImageContainer>
                    <ProfileTextContainer style={{ marginTop: 15 }}>{nickname}</ProfileTextContainer>
                    <ProfileTextContainer style={{ marginBottom: 15 }}>{email}</ProfileTextContainer>
                </AccountInfoContainer>
                <List
                    sx={{
                        padding: "20px 5px 20px 5px"
                    }}
                >
                    <ListItem>
                        <ListItemButton>
                            <ListItemIcon>
                                <PersonOutline color="#c2c2c2" />
                            </ListItemIcon>
                            <ListItemText primary="나의 계정" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton>
                            <ListItemIcon>
                                <PersonOutline color="#c2c2c2" />
                            </ListItemIcon>
                            <ListItemText primary="리스트2" />
                        </ListItemButton>
                    </ListItem>
                </List>
                <LogoutTextContainer onClick={handleOpen}>Logout</LogoutTextContainer>
            </div>
            <LogoutModal
                open={logoutOpen}
                close={handleClose}
            />
        </>
    );
};
export { MySettingNav };