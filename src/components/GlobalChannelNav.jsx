// DiscordServerNav.js
import { styled } from "@mui/system";
import { List, Divider } from "@mui/material";
import { BaseContainer } from "./BaseContainer";
import { GlobalChannelNavItem } from "./GlobalChannelNavItem";

const GlobalChannelNavContainer = styled(BaseContainer)`
    max-width: 72px;
    background-color: #e2e4e7;
`;

const GlobalChannelNavList = styled(List)`
    width: 100%; 
`;

const GlobalChannelNav = () => {
    return (
        <GlobalChannelNavContainer>
            <GlobalChannelNavList>
                <GlobalChannelNavItem />
                <Divider />
                <GlobalChannelNavItem />
                <GlobalChannelNavItem />
            </GlobalChannelNavList>
        </GlobalChannelNavContainer>
    );
};

export { GlobalChannelNav };