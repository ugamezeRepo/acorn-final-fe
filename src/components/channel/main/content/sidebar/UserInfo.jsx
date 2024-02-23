import styled from "@emotion/styled";
import { Avatar, Badge, List, ListSubheader } from "@mui/material";

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
    width: 75px;
    padding-left: 12px;
    font-size: 1.1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;
const UserBox = styled.div`
    display: flex;
    align-items: center;    
    opacity: ${(props) => props.state === "오프라인" ? 0.5 : 1};
`;

const RList = styled(List)`
    height:94vh;
    &::-webkit-scrollbar{
        width:0px;
    }

`;

const handleStatusColor = (state) => {
    if (state === "온라인") return "success";
    if (state === "자리 비움") return "secondary";
    if (state === "방해 금지") return "error";

    // switch (state) {
    //     case "온라인":
    //         return "success";
    //     case "자리 비움":
    //         return "secondary";
    //     case "방해 금지":
    //         return "error";
    //     default:
    //         return;
    // }
};

const UserInfo = () => {
    const dummyUser = [
        { nickname: "user01", state: "온라인" },
        { nickname: "user02", state: "자리 비움" },
        { nickname: "user03", state: "온라인" },
        { nickname: "user04", state: "오프라인" },
        { nickname: "user05", state: "온라인" },
        { nickname: "user06", state: "온라인" },
        { nickname: "user07", state: "자리 비움" },
        { nickname: "user08", state: "오프라인" },
        { nickname: "user09", state: "방해 금지" },
        { nickname: "user10", state: "온라인" },
        { nickname: "user11", state: "온라인" },
        { nickname: "user12", state: "자리 비움" },
        { nickname: "user13", state: "방해 금지" },
        { nickname: "user14", state: "온라인" },
        { nickname: "user15", state: "온라인" },
        { nickname: "user16", state: "자리 비움" },
    ];

    return (
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
                {["온라인", "오프라인"].map((isOnline, index) => (
                    <li key={`section-${index}`}>
                        <ul>
                            <ListSubheader>{`${isOnline} - ${dummyUser.filter((e) => index ? e.state === "오프라인" : e.state !== "오프라인").length}`}</ListSubheader>
                            {dummyUser.map((user, idx) => {
                                if ((isOnline === "온라인" && user.state !== "오프라인") || (isOnline === "오프라인" && user.state === "오프라인"))
                                    return (
                                        <UserBox key={`user-${idx}`} state={user.state}>
                                            <AvatarBadge
                                                overlap="circular"
                                                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                                                variant="dot"
                                                color={handleStatusColor(user.state)}
                                            >
                                                <Avatar sx={{ width: "32px", height: "32px" }} />
                                            </AvatarBadge>
                                            <NicknameContainer>{user.nickname}</NicknameContainer>
                                        </UserBox>
                                    );
                            })}
                        </ul>
                    </li>
                ))}
            </RList>
        </UserInfoContainer >
    );
};

export { UserInfo };