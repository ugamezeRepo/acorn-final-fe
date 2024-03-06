import { BaseHeaderContainer } from "@components/basis/BaseHeaderContainer";
import { ChannelContext } from "@contexts/ChannelContext";
import styled from "@emotion/styled";
import { Group } from "@mui/icons-material";
import { List } from "@mui/material";
import PropTypes from "prop-types";
import { useContext } from "react";

const ChannelMainHeaderContainer = styled(BaseHeaderContainer)`
    flex-grow: 0; 
    flex-shrink: 0; 
    border-bottom: 1.5px solid #e3e3e3;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
`;

const ChannelMainTopicLabel = styled.div`
    display: flex;

`;

const MyPageFriendsList = styled(List)`
    display: flex;
    & > li {
        margin-right:20px;
    }
`;

const MyPageMainHeader = () => {
    return (
        <ChannelMainHeaderContainer>
            <ChannelMainTopicLabel>
                <MyPageFriendsList>
                    <li>친구</li>
                    <li>온라인</li>
                    <li>모두</li>
                    <li>대기 중</li>
                    <li>차단 목록</li>
                </MyPageFriendsList>
            </ChannelMainTopicLabel>
        </ChannelMainHeaderContainer>
    );
};


MyPageMainHeader.propTypes = {
    setMemberSidebarOpen: PropTypes.func.isRequired
};
export { MyPageMainHeader };