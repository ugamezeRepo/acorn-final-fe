import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import PropTypes from "prop-types";

const MyPageNav = ({ showProfile, showChannelProfile }) => {
    return (
        <List>
            <ListItem>
                <ListItemButton onClick={showProfile}>
                    <ListItemText primary="내계정" />
                </ListItemButton>
            </ListItem>
            <ListItem>
                <ListItemButton onClick={showChannelProfile}>
                    <ListItemText primary="프로필" />
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

MyPageNav.propTypes = {
    showProfile: PropTypes.func.isRequired,
    showChannelProfile: PropTypes.func.isRequired,
};
export { MyPageNav };