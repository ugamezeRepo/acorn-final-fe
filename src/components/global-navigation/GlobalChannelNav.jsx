// DiscordServerNav.js
import { BaseContainer } from "@components/basis/BaseContainer";
import { GlobalChannelNavItem } from "@components/global-navigation/GlobalChannelNavItem";
import { Divider, List } from "@mui/material";
import { styled } from "@mui/system";


const GlobalChannelNavContainer = styled(BaseContainer)`
    max-width: 72px;
    background-color: #e2e4e7;
    overflow: auto;


    /** hidden scrollbar  **/
    &::-webkit-scrollbar {
        display: none;     
    }
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
`;

const GlobalChannelNavList = styled(List)`
    width: 100%; 
`;

const GlobalChannelNav = () => {
    return (
        <GlobalChannelNavContainer>
            <GlobalChannelNavList>
                <GlobalChannelNavItem channelId={1} />
                <Divider sx={{ margin: "0 16px", borderWidth: "1px" }} />
                <GlobalChannelNavItem channelId={2} channelName="너" />
                <GlobalChannelNavItem channelId={3} channelName="abc" />
                <GlobalChannelNavItem channelId={3} channelName="abc" />
                <GlobalChannelNavItem channelId={3} channelName="abc" />
                <GlobalChannelNavItem channelId={3} channelName="abc" />
                <GlobalChannelNavItem channelId={3} channelName="abc" />
                <GlobalChannelNavItem channelId={3} channelName="abc" />
                <GlobalChannelNavItem channelId={3} channelName="abc" />
                <GlobalChannelNavItem channelId={3} channelName="abc" />
                <GlobalChannelNavItem channelId={3} channelName="abc" />
                <GlobalChannelNavItem channelId={3} channelName="abc" />
                <GlobalChannelNavItem channelId={3} channelName="abc" />
                <GlobalChannelNavItem channelId={3} channelName="abc" />
                <GlobalChannelNavItem channelId={3} channelName="abc" />
                <GlobalChannelNavItem channelId={3} channelName="abc" />
            </GlobalChannelNavList>
        </GlobalChannelNavContainer>
    );
};

export { GlobalChannelNav };