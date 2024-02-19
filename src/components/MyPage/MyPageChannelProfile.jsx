import { MyPageChannelSelect } from "@components/MyPage/MyPageChannelSelect";
import { MemberContext } from "@contexts/MemberContext";
import styled from "@emotion/styled";
import { TextField } from "@mui/material";
import { useContext } from "react";

const ChannelProfileContainer = styled.div`
    width:690px;
    padding: 60px 10px 80px 40px;
`;

const ChannelSelectContainer = styled.div`
    width: 690px;
    padding-bottom: 24px;
    border-bottom: 1px solid #cecece;
    margin-top: 16px;
    margin-bottom: 24px;
`;

const MyPageChannelProfile = () => {

    const { nickname } = useContext(MemberContext);

    return (
        <ChannelProfileContainer>
            <h3>프로필</h3>
            <ChannelSelectContainer>
                <MyPageChannelSelect />
            </ChannelSelectContainer>
            <TextField
                label="서버 별명"
                defaultValue={nickname}
                variant="standard"
            />
        </ChannelProfileContainer>
    );
};
export { MyPageChannelProfile };