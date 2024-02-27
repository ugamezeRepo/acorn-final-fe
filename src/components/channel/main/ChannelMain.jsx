
import { BaseContainer } from "@components/basis/BaseContainer";
import { ChannelMainContent } from "@components/channel/main/content/ChannelMainContent";
import { ChannelMainHeader } from "@components/channel/main/header/ChannelMainHeader";
import styled from "@emotion/styled";
import { useState } from "react";

const ChannelMainContainer = styled(BaseContainer)`
    background-color: #fff;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
`;

const ChannelMain = () => {
    const [memeberSidebarOpen, setMemberSidebarOpen] = useState(false);
    return (
        <ChannelMainContainer>
            <ChannelMainHeader setMemberSidebarOpen={setMemberSidebarOpen} />
            <ChannelMainContent memberSidebarOpen={memeberSidebarOpen} />
        </ChannelMainContainer>
    );
};

export { ChannelMain };