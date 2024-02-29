import { Avatar, ListItem, ListItemAvatar } from "@mui/material";
import { useNavigate } from "react-router-dom";

const GlobalChannelNavMyPageItem = () => {
    const navigate = useNavigate();
    return (
        <ListItem onClick={() => { navigate(`/channel/@me`); }} >
            <ListItemAvatar>
                <Avatar alt={`mypage`} sx={{ cursor: "pointer" }} />
            </ListItemAvatar>
        </ListItem >
    );
};


export { GlobalChannelNavMyPageItem };