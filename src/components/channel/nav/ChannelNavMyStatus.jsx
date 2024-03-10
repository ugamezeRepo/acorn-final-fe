
import { MySetting } from "@components/my-setting/MySetting";
import { CHATTING_INPUT_BG_COLOR, MY_STAT_HOVER_BG_COLOR } from "@configs/color";
import { MemberContext } from "@contexts/MemberContext";
import styled from "@emotion/styled";
import { HeadsetMic, HeadsetOff, Mic, MicOff, Settings } from "@mui/icons-material";
import { Avatar, Badge, IconButton, Modal } from "@mui/material";
import { useContext, useEffect, useState } from "react";

const ChannelNavMyStatusContainer = styled.div`
    flex-grow: 0; 
    flex-shrink: 0;
    background-color: ${CHATTING_INPUT_BG_COLOR};
    height: 53px;
    display: flex;
`;


const MyInfoGroup = styled.div`
    width: 122px;
    margin: 6px;
    border-radius: 8px;
    display: flex;  


    &:hover {
        background-color: ${MY_STAT_HOVER_BG_COLOR};
        transition: background-color 0.18s linear;
    }
`;

const MySettingGroup = styled.div`
    display: flex;
    margin-top: 8px;
    margin-bottom: 8px;
`;

const AvatarBadge = styled(Badge)`
    margin: 6px;
    & .MuiBadge-badge {
        background-color: #44b700;
        color: #44b700;
    }
`;

const NickStatusBox = styled.div`

`;

const NicknameContainer = styled.div`
    width: 75px;
    font-size: 0.8em;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const StatusContainer = styled.div`
    font-size: 0.8em;
`;


const ChannelNavMyStatus = () => {
    const { nickname, email, status, micEnabled, soundEnabled, setMicEnabled, setSoundEnabled } = useContext(MemberContext);
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        const close = (e) => {
            if (e.keyCode === 27) {
                handleClose();
            }
        };
        window.addEventListener("keydown", close);
        return () => window.removeEventListener("keydown", close);
    });

    return (
        <ChannelNavMyStatusContainer>
            <MyInfoGroup>
                <AvatarBadge overlap="circular" anchorOrigin={{ vertical: "bottom", horizontal: "right" }} variant="dot">
                    <Avatar sx={{ width: "32px", height: "32px" }} />
                </AvatarBadge>
                <NickStatusBox>
                    <NicknameContainer>{nickname}</NicknameContainer>
                    <NicknameContainer>{email}</NicknameContainer>
                    <StatusContainer>{status}</StatusContainer>
                </NickStatusBox>
            </MyInfoGroup>
            <MySettingGroup>
                <IconButton size="small" sx={{ borderRadius: "2px" }} onClick={() => setMicEnabled(!micEnabled)}>
                    {micEnabled ? <Mic /> : <MicOff />}
                </IconButton>
                <IconButton size="small" sx={{ borderRadius: "2px" }} onClick={() => setSoundEnabled(!soundEnabled)}>
                    {soundEnabled ? <HeadsetMic /> : <HeadsetOff />}
                </IconButton>
                <IconButton size="small" sx={{ borderRadius: "2px" }} onClick={() => setOpen(true)}>
                    <Settings />
                </IconButton>
            </MySettingGroup>
            <Modal open={open} onClose={handleClose}>
                <>
                    <MySetting close={() => setOpen(false)} />
                </>
            </Modal>
        </ChannelNavMyStatusContainer>
    );
};

export { ChannelNavMyStatus };