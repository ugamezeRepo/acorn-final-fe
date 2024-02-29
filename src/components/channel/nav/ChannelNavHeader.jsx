import { BaseHeaderContainer } from "@components/basis/BaseHeaderContainer";
import { InviteModal } from "@components/global-navigation/InviteModal";
import { ChannelContext } from "@contexts/ChannelContext";
import { MemberContext } from "@contexts/MemberContext";
import styled from "@emotion/styled";
import { ArrowForwardIos, Close, ExpandMore } from "@mui/icons-material";
import { List, Popover } from "@mui/material";
import { axiosClient } from "@utils/axiosClient";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChannelNavHeaderContainer = styled(BaseHeaderContainer)`
    flex-grow: 0; 
    flex-shrink: 0; 
    border-bottom: 1.5px solid #e3e3e3;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;


    &:hover {
        background-color: #dfe1e5;
        cursor: pointer;
    };
    
`;

const ChannelLabel = styled.h3`
    margin: 0; 
    padding: 8px 12px; 
`;

const AddList = styled(List)`
    & > li {
        cursor: pointer;
    }
`;

const ChannelSettingPopOver = styled(Popover)``;
const InviteModalPopOver = styled(Popover)``;

const ChannelNavHeader = () => {
    const { setChannels } = useContext(MemberContext);
    const { currentChannel } = useContext(ChannelContext);
    const navigate = useNavigate();
    const [channelSettingOpened, setChannelSettingOpened] = useState(false);
    const [inviteOpen, setInviteOpen] = useState(null);
    const handleOpenInviteModal = Boolean(inviteOpen);

    const handleOpenAddInvite = (e) => {
        setInviteOpen(e.currentTarget);
    };

    const handleCloseInviteModal = () => {
        setInviteOpen(null);
    };

    const deleteChannel = async () => {
        const confirm = window.confirm("진짜 삭제할겨?");
        if (confirm) {
            await axiosClient.delete(`/channel/${currentChannel.id}`);
            const { data: channels } = await axiosClient.get("/member/@me/channel");
            setChannels(channels);
            navigate("/channel/@me");
        }
    };

    return (
        <div>

            <ChannelNavHeaderContainer onClick={() => setChannelSettingOpened(status => !status)}>
                <ChannelLabel>{currentChannel?.name}</ChannelLabel>
                <ChannelSettingPopOver
                    open={channelSettingOpened}
                    anchorReference="anchorPosition"
                    anchorPosition={{ top: 55, left: 80 }}
                >
                    <div style={{ width: "225px" }}>
                        <AddList>
                            <li onClick={handleOpenAddInvite}>초대하기</li>
                            <hr />
                            <li onClick={deleteChannel}>채널 삭제</li>
                        </AddList>
                    </div>
                </ChannelSettingPopOver>
                {channelSettingOpened ? <Close /> : <ExpandMore />}

            </ChannelNavHeaderContainer>
            <InviteModalPopOver
                open={handleOpenInviteModal}
                onClose={handleCloseInviteModal}
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
                <InviteModal name={currentChannel?.name} inviteCode={currentChannel.inviteCode} />
            </InviteModalPopOver>
        </div>
    );
};

export { ChannelNavHeader };