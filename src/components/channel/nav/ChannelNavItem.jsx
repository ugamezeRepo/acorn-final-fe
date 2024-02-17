import { BaseContainer } from "@components/basis/BaseContainer";
import { ChannelContext } from "@contexts/ChannelContext";
import styled from "@emotion/styled";
import { Settings, Tag } from "@mui/icons-material";
import { ListItemButton, Modal } from "@mui/material";
import PropTypes from "prop-types";
import { useContext, useState} from "react";

import { ChannelNavSettingModal } from "./ChannelNavSettingModal";

const ChannelNavItemInternalContainer = styled(BaseContainer)`
    display:flex;
    justify-content: space-between;
`;

const InternalItemLabelBox = styled.div`
    display: flex;
`;

const InternalItemManagementBox = styled.div`
    display: flex;
`;




const ChannelNavItem = ({
    // TODO: add props for topic type
    topicName,
    topicId,
}) => {
    const { setTopicId, setTopicName } = useContext(ChannelContext);
    const [open, setOpen] = useState(false);
    const handleModalClose = () => {
        setOpen(false);
    };
    const handleModalOpen = () => {
        setOpen(true);
    };

    return (
        <ListItemButton onClick={() => {
            console.log("clicked topic with id " + topicId);
            setTopicId(topicId);
            setTopicName(topicName);
        }} sx={{ display: "flex", margin: "6px", borderRadius: "8px" }}>
            <ChannelNavItemInternalContainer>
                <InternalItemLabelBox>
                    <Tag fontSize="small" sx={{ color: "gray", marginRight: "6px" }} />
                    <span style={{ fontSize: "0.9em" }}>{topicName}</span>    
                </InternalItemLabelBox>

                <InternalItemManagementBox>
                    <Settings 
                        sx={{ fontSize: "18px", color: "gray", "&:hover": {"color" : "green"}}}
                        onClick={handleModalOpen}
                    />
                    <ChannelNavSettingModal open={open} handleClose={handleModalClose}/>
                </InternalItemManagementBox>
            </ChannelNavItemInternalContainer>
        </ListItemButton>
    );
};

ChannelNavItem.propTypes = {
    topicName: PropTypes.string.isRequired,
    topicId: PropTypes.number.isRequired,
};

export { ChannelNavItem };