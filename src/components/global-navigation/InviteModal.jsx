import { PropTypes } from "prop-types";

const InviteModal = () => {

    return (
        <div>
            <div>
                <p>친구에게 서버 초대 링크 전송하기</p>
                <input type="text" value={`https://dotori.site/invite/${currentChannel.inviteCode}`} readOnly />
            </div>
        </div>
    );
};

InviteModal.protTypes = {
    currentChannel: PropTypes.shape({
        inviteCode: PropTypes.any
    }).isRequired
};

export { InviteModal };