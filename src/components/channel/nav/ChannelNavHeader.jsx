import { BaseHeaderContainer } from "@components/basis/BaseHeaderContainer";
import { ChannelContext } from "@contexts/ChannelContext";
import styled from "@emotion/styled";
import { Close, ExpandMore } from "@mui/icons-material";
import { Popover } from "@mui/material";
import { useContext, useState } from "react";

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


const ChannelSettingPopOver = styled(Popover)``;

const ChannelNavHeader = () => {
    const { currentChannel } = useContext(ChannelContext);
    const [channelSettingOpened, setChannelSettingOpened] = useState(false);
    return (
        <ChannelNavHeaderContainer onClick={() => setChannelSettingOpened(status => !status)}>
            <ChannelLabel>{currentChannel.name}</ChannelLabel>
            <ChannelSettingPopOver
                open={channelSettingOpened}
                anchorReference="anchorPosition"
                anchorPosition={{ top: 55, left: 80 }}
            >
                <div style={{ width: "225px" }}>
                    <div>초대하기</div>
                    <div>초대하기</div>
                    <div>초대하기</div>
                    <div>초대하기</div>
                    <div>초대하기</div>
                    <div>초대하기</div>
                </div>
            </ChannelSettingPopOver>
            {channelSettingOpened ? <Close /> : <ExpandMore />}
        </ChannelNavHeaderContainer>
    );
};

export { ChannelNavHeader };