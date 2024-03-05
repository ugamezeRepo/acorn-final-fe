import { SetTopic } from "@components/channel/nav/SetTopic";
import { ChannelContext } from "@contexts/ChannelContext";
import styled from "@emotion/styled";
import { Tag } from "@mui/icons-material";
import SettingsIcon from "@mui/icons-material/Settings";
import { ListItemButton, Popover } from "@mui/material";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";



const ChannelNavItem = ({
    // TODO: add props for topic type
    topicName,
    topicId,
}) => {
    const { currentChannel } = useContext(ChannelContext);
    const navigate = useNavigate();
    const [openSet, SetOpenSet] = useState(null);
    const openTopicSetting = Boolean(openSet);
    const OpenTopicSet = (e) => {
        SetOpenSet(e.currentTarget);
    };
    const CloseTopicSetting = () => {
        SetOpenSet(null);
    };

    const SetIcon = styled(SettingsIcon)`
        color: #cacaca;
        &:hover {
            color:#808080;
        }
    `;

    return (
        <>
            <ListItemButton onClick={() => {
                navigate(`/channel/${currentChannel.id}/topic/${topicId}`);
            }} sx={{ display: "flex", justifyContent: "space-between", margin: "6px", borderRadius: "8px" }}>
                <div style={{ display: "flex" }}>
                    <Tag fontSize="small" sx={{ color: "gray", marginRight: "6px" }} />
                    <span style={{ fontSize: "0.9em" }}>{topicName}</span>
                </div>
                <SetIcon fontSize="small" onClick={OpenTopicSet} />
            </ListItemButton>
            <Popover open={openTopicSetting} onClose={CloseTopicSetting}
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
                <SetTopic />
            </Popover>

        </>
    );
};

ChannelNavItem.propTypes = {
    topicName: PropTypes.string.isRequired,
    topicId: PropTypes.number.isRequired,
};
export { ChannelNavItem };