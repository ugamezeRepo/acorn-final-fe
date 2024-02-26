import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";

const MyPageNav = () => {
    return (
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
                    <ListItemText primary="로그아웃" />
                </ListItemButton>
            </ListItem>
        </List>
    );
};
export { MyPageNav };