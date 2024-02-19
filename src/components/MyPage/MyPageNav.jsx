import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";



const MyPageNav = () => {
    return(
        <List>
            <ListItem>
                <ListItemButton>
                    <ListItemText primary="내계정"/>
                </ListItemButton>
            </ListItem>
            <ListItem>
                <ListItemButton>
                    <ListItemText primary="프로필"/>
                </ListItemButton>
            </ListItem>
        </List>
    );
};
export {MyPageNav};