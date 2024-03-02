import styled from "@emotion/styled";
import { PropTypes } from "prop-types";

const ModalContainer = styled.div`
    padding:10px;
`;

const InviteCodeInput = styled.input`
    width:100%;
    height:40px;
    border: 1px solid #cfcfcf;
    border-radius: 5px;
`;

const InviteModal = ({ name, inviteCode }) => {

    return (
        <div>
            <ModalContainer>
                <p>친구를 <strong>{name}</strong> 그룹으로 초대하기</p>
                <p>이 서버에 대한 엑세스 권한을 허용하려면 이 링크를 공유하세요. </p>
                <InviteCodeInput type="text" value={`https://dotori.site/invite/${inviteCode}`} readOnly />
            </ModalContainer>
        </div>
    );
};

InviteModal.propTypes = {
    name: PropTypes.string.isRequired,
    inviteCode: PropTypes.string.isRequired
};

export { InviteModal };