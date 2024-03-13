import { BaseContainer } from "@components/basis/BaseContainer";
import { DmList } from "@components/channel/main/content/sidebar/DmList";
import { ChannelNavMyStatus } from "@components/channel/nav/ChannelNavMyStatus";
import { SearchComponent } from "@components/channel/nav/SearchComponent";
import { NAV_BG_COLOR } from "@configs/color";
import styled from "@emotion/styled";
import { Button, List, Popover } from "@mui/material";
import { useState } from "react";



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

const FindDm = styled(Button)`
    margin: 10px;
    color: #727272;
    background-color: #e9e9e9;
`;

const AddDmButton = styled.div`
    font-size: 13px;
    color:#a8a8a8;
    display: flex;
    justify-content: space-between;
    padding:0 15px;
    & > span{
        cursor: pointer;
    }
`;

const MyPageNav = () => {

    const [openFind, setOpenFind] = useState(null);
    const openFindView = Boolean(openFind);

    const openClickFind = (e) => {
        setOpenFind(e.currentTarget);
    };

    const closeClickFind = () => {
        setOpenFind(null);
    };
    return (
        <>
            <ChannelNavContainer>
                <FindDm onClick={openClickFind}>대화 시작하기</FindDm>
                <Popover open={openFindView} onClose={closeClickFind}
                    anchorEl={openFind}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "left"
                    }}
                >
                    <SearchComponent />
                </Popover>
                <ChannelNavList>
                    <AddDmButton>
                        <div>다이렉트 메세지</div>
                        <span>+</span>
                    </AddDmButton>
                    <DmList />
                </ChannelNavList>
                <ChannelNavMyStatus />
            </ChannelNavContainer>
        </>
    );
};

export { MyPageNav };