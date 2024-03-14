import { BaseHeaderContainer } from "@components/basis/BaseHeaderContainer";
import { InviteModal } from "@components/global-navigation/InviteModal";
import { NAV_BG_HOVER_COLOR } from "@configs/color";
import { ChannelContext } from "@contexts/ChannelContext";
import styled from "@emotion/styled";
import { Close, DeleteOutline, ExpandMore, PersonAddAlt } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, List, Popover } from "@mui/material";
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
        background-color: ${NAV_BG_HOVER_COLOR};
        cursor: pointer;
    };
    
`;

const ChannelLabel = styled.h3`
    margin: 0; 
    padding: 8px 12px; 
`;

const AddList = styled(List)`
    text-indent: 20px;
    & > li {
        cursor: pointer;
        padding:5px;
        margin:0 10px;
    }
    & > li:hover {
        background-color: #eeeeee;
        border-radius: 5px;
        font-weight: 600;
    }
    & > hr {
        width: 90%;
        border: 1px solid #f2f3f5;
    }
`;

const ChannelSettingPopOver = styled(Popover)``;
const InviteModalPopOver = styled(Popover)``;

const CancelButton = styled(Button)`
  border-color: #535252 ;
  color: #535252;
  margin-right: 15px;
`;
const DeleteButton = styled(Button)`
  background-color: #ee5757 ;
  color: #ffffff;
`;

const ChannelNavHeader = () => {
    const { currentChannel } = useContext(ChannelContext);
    const navigate = useNavigate();
    const [channelSettingOpened, setChannelSettingOpened] = useState(false);
    const [inviteOpen, setInviteOpen] = useState(null);
    const handleOpenInviteModal = Boolean(inviteOpen);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    const handleOpenAddInvite = (e) => {
        setInviteOpen(e.currentTarget);
    };

    const handleCloseInviteModal = () => {
        setInviteOpen(null);
    };

    const handleOpenDeleteModal = () => {
        setDeleteModalOpen(true);
    };

    const handleCloseDeleteModal = () => {
        setDeleteModalOpen(false);
    };

    const deleteChannel = async () => {
        setDeleteModalOpen(false);
        await axiosClient.delete(`/channel/${currentChannel?.id}`);
        navigate("/channel/@me");
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
                            <li onClick={handleOpenAddInvite} style={{ display: "flex", alignItems: "center" }}><PersonAddAlt sx={{ marginLeft: "3px" }} />초대하기</li>
                            <hr />
                            <li onClick={handleOpenDeleteModal} style={{ display: "flex", alignItems: "center" }}><DeleteOutline />채널 삭제</li>
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
                <InviteModal name={currentChannel?.name} inviteCode={currentChannel?.inviteCode} close={handleCloseInviteModal} />
            </InviteModalPopOver>
            <Dialog open={deleteModalOpen} onClose={handleCloseDeleteModal}>
                <div
                    style={{
                        width: 300, height: 200, padding: "10px 20px 10px 20px", display: "flex", flexDirection: "column"
                    }}>
                    <div style={{ display: "flex", justifyContent: "right" }}>
                        <Close onClick={handleCloseDeleteModal} sx={{ cursor: "pointer" }} />
                    </div>
                    <h3 style={{ textAlign: "left" }}>채널 삭제</h3>
                    <h5 style={{ textAlign: "left", marginTop: 0 }}>채널을 삭제하시겠습니까?</h5>
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        <CancelButton onClick={handleCloseDeleteModal} variant="outlined">취소</CancelButton>
                        <DeleteButton onClick={deleteChannel} variant="contained" color="error">삭제</DeleteButton>
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export { ChannelNavHeader };