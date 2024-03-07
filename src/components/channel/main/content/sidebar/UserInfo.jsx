import { ChannelContext } from "@contexts/ChannelContext";
import styled from "@emotion/styled";
import { Avatar, Badge, List, ListSubheader, Popover } from "@mui/material";
import { useContext, useEffect, useState } from "react";

import { DmModal } from "/DmModal";

const UserInfoContainer = styled.div`
background-color: #f2f3f5;
    display: flex;
    flex-direction: column;
    background-color: #f2f3f5;
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
    const [openDm, setOpenDm] = useState(null);
    const handlePopover = Boolean(openDm);

    const handleOpenDm = (e) => {
        setOpenDm(e.currentTarget);
    };

    const handleCloseDm = () => {
        setOpenDm(null);
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
                        bgcolor: "background.paper",
                        position: "relative",
                        overflow: "auto",

                        "& ul": { padding: 0 },
                    }}
                    subheader={<li />}
                >
                    {["online", "offline"].map((isOnline, index) => (
                        <li key={`section-${index}`}>
                            <ul>
                                <ListSubheader>{`${isOnline} - ${members.filter((e) => index ? e.status === "offline" : e.status !== "offline").length}`}</ListSubheader>
                                {members.map((user, idx) => {
                                    return ((isOnline === "offline" && user.status === "offline") || (isOnline !== "offline" && user.status !== "offline")) &&
                                        (<UserBox key={`user-${idx}`} status={user.status} onClick={handleOpenDm}>
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
                anchorReference="anchorPosition"
                anchorPosition={{ left: window.innerWidth / 2, top: window.innerHeight / 2 }}
                anchorOrigin={{
                    vertical: "center",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "center",
                    horizontal: "center",
                }}>
                <DmModal />
            </Popover>
        </>
    );
};

export { UserInfo };
