import { BaseHeaderContainer } from "@components/basis/BaseHeaderContainer";
import styled from "@emotion/styled";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import { Button, List } from "@mui/material";
import PropTypes from "prop-types";

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
width: 60%;
`;

const MyPageFriendsList = styled(List)`
width:100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    & > li {
        display: flex;
        align-items: center;
    }
`;

const MyPageMainHeader = ({ handleButtonClick }) => {

    return (
        <ChannelMainHeaderContainer>
            <ChannelMainTopicLabel>
                <MyPageFriendsList>
                    <li><EmojiPeopleIcon></EmojiPeopleIcon><span>친구</span></li>
                    <li onClick={() => handleButtonClick("online")}>온라인</li>
                    <li onClick={() => handleButtonClick("all")}>모두</li>
                    <li onClick={() => handleButtonClick("standBy")}>대기 중</li>
                    <li onClick={() => handleButtonClick("block")}>차단 목록</li>
                    <li><Button onClick={() => handleButtonClick("addFriend")}>친구추가</Button></li>
                </MyPageFriendsList>
            </ChannelMainTopicLabel>
        </ChannelMainHeaderContainer>
    );
};
MyPageMainHeader.propTypes = {
    handleButtonClick: PropTypes.func.isRequired,
};
export { MyPageMainHeader };