// DiscordServerNav.js
import { BaseContainer } from "@components/basis/BaseContainer";
import { GlobalChannelNavItem } from "@components/global-navigation/GlobalChannelNavItem";
import { MemberContext } from "@contexts/MemberContext";
import { Divider, List } from "@mui/material";
import { styled } from "@mui/system";
import { useContext } from "react";


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
    & li > div > div:hover {
        border-radius: 10px;
        transition: border-radius 0.3s ease-in-out;
    }
`;

const GlobalChannelNav = () => {
    const { channels } = useContext(MemberContext);
    return (
        <GlobalChannelNavContainer>
            <GlobalChannelNavList>
                <GlobalChannelNavItem channel={
                    {
                        id: "@me",
                        name: "mypage"
                    }
                } />
                <Divider sx={{ margin: "0 16px", borderWidth: "1px" }} />
                {
                    channels.map((c, idx) => <GlobalChannelNavItem key={idx} channel={c} />)
                }
            </GlobalChannelNavList>
        </GlobalChannelNavContainer>
    );
};

export { GlobalChannelNav };