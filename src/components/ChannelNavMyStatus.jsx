import styled from "@emotion/styled";
import { Avatar, Badge } from "@mui/material";

const ChannelNavMyStatusContainer = styled.div`
    flex-grow: 0; 
    flex-shrink: 0;
    background-color: #ebedef;
    height: 53px;
    display: flex;
`;


const MyInfoGroup = styled.div`
    width: 122px;
    margin: 6px;
    border-radius: 8px;
    display: flex;  
    flex-grow: 0; 
    flex-shrink: 0;

    &:hover {
        background-color: #d2d4d8;
        transition: background-color 0.18s linear;
    }
`;

const MySettingGroup = styled.div`
    
`;

const AvatarBadge = styled(Badge)`
    margin: 6px;
    & .MuiBadge-badge {
        background-color: #44b700;
        color: #44b700;
    }
`;

const NickStatusBox = styled.div`
    display: flex;
    flex-direction: column;
`;
const ChannelNavMyStatus = () => {
    return (
        <ChannelNavMyStatusContainer>
            <MyInfoGroup>
                <AvatarBadge overlap="circular" anchorOrigin={{ vertical: "bottom", horizontal: "right" }} variant="dot">
                    <Avatar sx={{ width: "32px", height: "32px" }} />
                </AvatarBadge>
                <NickStatusBox>
                    <div>user with long long name</div>
                    <sub>온라인</sub>
                </NickStatusBox>
            </MyInfoGroup>
            <MySettingGroup>
                world
            </MySettingGroup>
        </ChannelNavMyStatusContainer>
    );
};

export { ChannelNavMyStatus };