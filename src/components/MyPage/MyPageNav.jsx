import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";

const MyPageNav = () => {
    return (
        <List>
            <ListItem>
                <ListItemButton>
                    <ListItemText primary="내계정" />
                </ListItemButton>
            </ListItem>
            <ListItem>
                <ListItemButton>
                    <ListItemText primary="로그아웃" />
                </ListItemButton>
            </ListItem>
        </List>
    );
};
export { MyPageNav };