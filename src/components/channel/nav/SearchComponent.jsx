import { MemberContext } from "@contexts/MemberContext";
import { Person, Search } from "@mui/icons-material";
import { InputAdornment, List, ListItemButton, ListItemIcon, ListItemText, TextField } from "@mui/material";
import { axiosClient } from "@utils/axiosClient";
import { useContext, useEffect, useState } from "react";

const SearchComponent = () => {

    const { id } = useContext(MemberContext);
    const [searchText, setSearchText] = useState("");
    const [friendList, setFriendList] = useState([]);
    const [selectedFriend, setSelectedFriend] = useState({});

    useEffect(() => {
        const searchFriends = async () => {
            await axiosClient.get(`/friend${id}/list`)
                .then(res => {
                    setFriendList(res.data);
                })
                .catch(error => { console.log(error); });
        };
        searchFriends();
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: 600,
                minHeight: 70
            }}
        >
            <TextField
                sx={{
                    width: 580,
                    marginTop: 2
                }}
                size="small"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Search />
                        </InputAdornment>
                    ),
                }}
                autoFocus
                placeholder="닉네임 입력"
                onChange={(e) => setSearchText(e.target.value)}
            />
            <List sx={{ width: 580 }}>
                {friendList.filter(item => item.nickname.includes(searchText))
                    .map((friend, idx) => (
                        <ListItemButton key={idx} sx={{ textAlign: "left" }} onClick={() => setSelectedFriend(friend)}>
                            <ListItemIcon><Person /></ListItemIcon>
                            <ListItemText><strong style={{ marginRight: 5 }}>{friend.nickname}</strong> #{friend.hashtag}</ListItemText>
                        </ListItemButton>
                    ))
                }
            </List>

        </div>
    );
};
export { SearchComponent };