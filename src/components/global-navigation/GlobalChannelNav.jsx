// DiscordServerNav.js
import { BaseContainer } from "@components/basis/BaseContainer";
import { CreateChannel } from "@components/global-navigation/CreateChannel";
import { GlobalChannelNavItem } from "@components/global-navigation/GlobalChannelNavItem";
import { GlobalChannelNavMyPageItem } from "@components/global-navigation/GlobalChannelNavMyPageItem";
import { GLOBAL_NAV_BG_COLOR, GLOBAL_NAV_ICON_BG_COLOR } from "@configs/color";
import { MemberContext } from "@contexts/MemberContext";
import { Divider, List } from "@mui/material";
import { Popover } from "@mui/material";
import { Button } from "@mui/material";
import { styled } from "@mui/system";
import { useContext, useState } from "react";

const GlobalChannelNavContainer = styled(BaseContainer)`
    min-width: 72px;
    max-width: 72px;
    background-color: ${GLOBAL_NAV_BG_COLOR};
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
    background-color: ${GLOBAL_NAV_ICON_BG_COLOR};
    margin-top:10px;
    font-size: 26px;
    color: #18a518;
    text-align: center;
    &:hover {
        border-radius: 10px;
        transition: border-radius 0.3s ease-in-out;
        color: white;
        background-color: #18a518;
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
                <GlobalChannelNavMyPageItem />
                <Divider sx={{ margin: "0 16px", borderWidth: "1px" }} />
                {
                    channels?.map((c, idx) => <GlobalChannelNavItem key={idx} channel={c} />)
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
                <CreateChannel handleClose={handleCloseCreateModal} />
            </Popover>

        </GlobalChannelNavContainer>
    );
};

export { GlobalChannelNav };