import { LogoutModal } from "@components/my-setting/LogoutModal";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useState } from "react";

const MySettingNav = () => {
    const [logoutOpen, setLogoutOpen] = useState(false);

    const handleOpen = () => {
        setLogoutOpen(true);
    };

    const handleClose = () => {
        setLogoutOpen(false);
    };

    return (
        <>
            <List
                sx={{
                    padding: "60px 6px 60px 20px"
                }}
            >
                <ListItem>
                    <ListItemButton>
                        <ListItemText primary="내계정" />
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton>
                        <ListItemText primary="로그아웃" onClick={handleOpen} />
                    </ListItemButton>
                </ListItem>
            </List>
            <LogoutModal
                open={logoutOpen}
                close={handleClose}
            />
        </>
    );
};
export { MySettingNav };