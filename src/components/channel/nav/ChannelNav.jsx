import { BaseContainer } from "@components/basis/BaseContainer";
import { ChannelNavHeader } from "@components/channel/nav/ChannelNavHeader";
import { ChannelNavItem } from "@components/channel/nav/ChannelNavItem";
import { ChannelNavMyStatus } from "@components/channel/nav/ChannelNavMyStatus";
import { ChannelContext } from "@contexts/ChannelContext";
import styled from "@emotion/styled";
import { List } from "@mui/material";
import { useContext } from "react";

const ChannelNavContainer = styled(BaseContainer)`
    max-width: 240px;
    display: flex;
    flex-direction: column;
    background-color: #f2f3f5;
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

const ChannelNav = () => {
    const { topics } = useContext(ChannelContext);
    return (
        <ChannelNavContainer>
            <ChannelNavHeader />
            <ChannelNavList>
                {
                    topics.map((t, idx) => (<ChannelNavItem key={idx} topicId={t.id} topicName={t.title} />))
                }
            </ChannelNavList>
            <ChannelNavMyStatus />
        </ChannelNavContainer>
    );
};

export { ChannelNav };