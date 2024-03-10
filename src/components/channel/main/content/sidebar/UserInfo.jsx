import { DmModal } from "@components/channel/main/content/sidebar/DmModal";
import { NAV_BG_COLOR } from "@configs/color";
import { ChannelContext } from "@contexts/ChannelContext";
import styled from "@emotion/styled";
import { Avatar, Badge, List, ListSubheader, Popover } from "@mui/material";
import { useContext, useEffect, useState } from "react";


const UserInfoContainer = styled.div`
    background-color: ${NAV_BG_COLOR};
    display: flex;
    flex-direction: column;
    width: 240px;
`;

const AvatarBadge = styled(Badge)`
    margin: 6px 0;
`;

const NicknameContainer = styled.div`
    width: auto;
    padding-left: 12px;
    font-size: 1.1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;
const UserBox = styled.div`
    display: flex;
    align-items: center;    
    opacity: ${(props) => props.status === "offline" ? 0.5 : 1};
`;

const RList = styled(List)`
    height:94vh;
    &::-webkit-scrollbar{
        width:0px;
    }
`;

const handleStatusColor = (status) => {
    if (status === "online") return "success";
    if (status === "idle") return "secondary";
    if (status === "do not disturb") return "error";
};

const UserInfo = () => {
    const { channelUsers } = useContext(ChannelContext);
    const [members, setMembers] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [openDm, setOpenDm] = useState(null);
    const handlePopover = Boolean(openDm);

    const handleOpenDm = (event, selectedUser) => {
        setOpenDm(selectedUser);
        setAnchorEl(event.currentTarget);
    };

    const handleCloseDm = () => {
        setOpenDm(null);
        setAnchorEl(null);
    };

    useEffect(() => {
        if (!channelUsers) return;
        setMembers(channelUsers);
    }, [channelUsers, setMembers]);

    return (
        <>
            <UserInfoContainer>
                <RList
                    sx={{
                        width: "100%",
                        maxWidth: 360,
                        position: "relative",
                        overflow: "auto",
                        "& ul": { padding: 0 },
                    }}
                    subheader={<li />}
                >
                    {["online", "offline"].map((isOnline, index) => (
                        <li key={`section-${index}`}>
                            <ul>
                                <ListSubheader sx={{ bgcolor: NAV_BG_COLOR }}>{`${isOnline} - ${members.filter((e) => index ? e.status === "offline" : e.status !== "offline").length}`}</ListSubheader>
                                {members.map((user, idx) => {
                                    return ((isOnline === "offline" && user.status === "offline") || (isOnline !== "offline" && user.status !== "offline")) &&
                                        (<UserBox key={`user-${idx}`} status={user.status} onClick={(event) => handleOpenDm(event, user)}>
                                            <AvatarBadge
                                                overlap="circular"
                                                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                                                variant="dot"
                                                color={handleStatusColor(user.status)}
                                            >
                                                <Avatar sx={{ width: "32px", height: "32px" }} />
                                            </AvatarBadge>
                                            <NicknameContainer>{user.nickname}</NicknameContainer>
                                        </UserBox>);
                                })}
                            </ul>
                        </li>
                    ))}
                </RList>
            </UserInfoContainer >
            <Popover
                open={handlePopover}
                onClose={handleCloseDm}
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}>
                <DmModal selectedUser={openDm} onClose={handleCloseDm} />
            </Popover>
        </>
    );
};

export { UserInfo };
