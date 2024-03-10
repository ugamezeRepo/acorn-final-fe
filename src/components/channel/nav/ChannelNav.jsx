import { BaseContainer } from "@components/basis/BaseContainer";
import { ChannelNavHeader } from "@components/channel/nav/ChannelNavHeader";
import { ChannelNavItem } from "@components/channel/nav/ChannelNavItem";
import { ChannelNavMyStatus } from "@components/channel/nav/ChannelNavMyStatus";
import { CreateTopic } from "@components/channel/nav/CreateTopic";
import { NAV_BG_COLOR } from "@configs/color";
import { ChannelContext } from "@contexts/ChannelContext";
import styled from "@emotion/styled";
import { List, Popover } from "@mui/material";
import { useContext, useState } from "react";


const ChannelNavContainer = styled(BaseContainer)`
    max-width: 240px;
    display: flex;
    flex-direction: column;
    background-color: ${NAV_BG_COLOR};
`;


const ChannelNavList = styled(List)`
    width: 100%; 
    flex-grow: 1;
    flex-shrink: 1;
    max-height: 100%;
    overflow: auto;

    &::-webkit-scrollbar{
        width:10px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #747474;
        border-radius: 6px;
        background-clip: padding-box;
        border: 2px solid transparent;
        min-height: 50px;
    }
    &::-webkit-scrollbar-thumb:hover {
        background-color: #222222;
    }
    &::-webkit-scrollbar-track {
        background-color:transparent;
    }
    &::-webkit-scrollbar-button{
    }
    &::-webkit-scrollbar-corner{
        background: transparent;
    }
`;

const AddTopicButton = styled.div`
    font-size: 13px;
    color:#a8a8a8;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    padding:0 15px;
`;

const AddTopicModal = styled(Popover)`
    
`;

const ChannelNav = () => {
    const { topics } = useContext(ChannelContext);
    const [openTopic, setOpenTopic] = useState(null);
    const OpenAddTopicModal = Boolean(openTopic);

    const AddTopic = (e) => {
        setOpenTopic(e.currentTarget);
    };
    const CloseAddTopicModal = () => {
        setOpenTopic(null);
    };
    return (
        <>
            <ChannelNavContainer>
                <ChannelNavHeader />
                <ChannelNavList>
                    <AddTopicButton onClick={AddTopic}>
                        <div>토픽 추가하기</div>
                        <div>+</div>
                    </AddTopicButton>
                    {
                        topics?.map((t, idx) => (<ChannelNavItem key={idx} topicId={t.id} topicName={t.title} />))
                    }
                </ChannelNavList>
                <ChannelNavMyStatus />
            </ChannelNavContainer>

            <AddTopicModal
                open={OpenAddTopicModal}
                onClose={CloseAddTopicModal}
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
                <CreateTopic handleClose={CloseAddTopicModal} />
            </AddTopicModal>
        </>
    );
};

export { ChannelNav };