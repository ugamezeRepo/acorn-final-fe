import { BaseContainer } from "@components/basis/BaseContainer";
import { ChannelNavMyStatus } from "@components/channel/nav/ChannelNavMyStatus";
import { SearchComponent } from "@components/channel/nav/SearchComponent";
import styled from "@emotion/styled";
import { Button, List, Popover } from "@mui/material";
import { useState } from "react";



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

const DmList = styled(List)`
    font-size: 14px;
    margin-top:10px;
    padding:0 15px;
    & > li {
        padding:10px;
        border-radius: 5px;
    }
    & > li:hover { 
        background-color: #ebebeb;
        color:#858585;
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
                    <DmList>
                        <li>DM 중인 친구 닉네임 1</li>
                        <li>DM 중인 친구 닉네임 2</li>
                    </DmList>
                </ChannelNavList>
                <ChannelNavMyStatus />
            </ChannelNavContainer>
        </>
    );
};

export { MyPageNav };