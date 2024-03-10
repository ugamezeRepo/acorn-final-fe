import { GLOBAL_NAV_ICON_BG_COLOR } from "@configs/color";
import { Avatar, ListItem, ListItemAvatar } from "@mui/material";
import { useNavigate } from "react-router-dom";

const GlobalChannelNavMyPageItem = () => {
    const navigate = useNavigate();
    return (
        <ListItem onClick={() => { navigate(`/channel/@me`); }} >
            <ListItemAvatar>
                <Avatar alt={`mypage`} sx={{ cursor: "pointer", bgcolor: GLOBAL_NAV_ICON_BG_COLOR }} />
            </ListItemAvatar>
        </ListItem >
    );
};


export { GlobalChannelNavMyPageItem };