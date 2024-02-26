// DiscordServerNav.js
import { BaseContainer } from "@components/basis/BaseContainer";
import { CreateChannel } from "@components/global-navigation/CreateChannel";
import { GlobalChannelNavItem } from "@components/global-navigation/GlobalChannelNavItem";
import { MemberContext } from "@contexts/MemberContext";
import { Divider, List } from "@mui/material";
import { Popover } from "@mui/material";
import { Button } from "@mui/material";
import { styled } from "@mui/system";
import { useContext, useState } from "react";



const GlobalChannelNavContainer = styled(BaseContainer)`
    min-width: 72px;
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

const CreateChannelButton = styled(Button)`
    width: 40px;
    height:40px;
    border-radius: 50%;
    min-width: 40px;
    left:22%;
    background-color: gray;
    margin-top:10px;
    font-size: 26px;
    color: #1bc01b;
    text-align: center;
    &:hover {
        border-radius: 10px;
        transition: border-radius 0.3s ease-in-out;
        color: white;
        background-color: #1bc01b;
    }
    
`;


const GlobalChannelNav = () => {
    const { channels } = useContext(MemberContext);

    const [createModalAnchor, setCreateModalAnchor] = useState(null);

    const handleOpenCreateModal = (e) => {
        setCreateModalAnchor(e.currentTarget);
    };

    const handleCloseCreateModal = () => {
        setCreateModalAnchor(null);
    };

    const openCreateModal = Boolean(createModalAnchor);

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
                <CreateChannelButton onClick={handleOpenCreateModal}>+</CreateChannelButton>
            </GlobalChannelNavList>



            <Popover
                open={openCreateModal}
                onClose={handleCloseCreateModal}
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
                <CreateChannel />
            </Popover>

        </GlobalChannelNavContainer>
    );
};

export { GlobalChannelNav };