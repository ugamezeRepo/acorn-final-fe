import { MemberContext } from "@contexts/MemberContext";
import { axiosClient } from "@utils/axiosClient";
import { PropTypes } from "prop-types";
import { useContext, useState } from "react";

const CreateChannel = ({ handleClose }) => {
    const { nickname, hashtag, updateMyInfo } = useContext(MemberContext);
    const [serverName, setServerName] = useState("");

    const handleServerName = (e) => {
        setServerName(e.target.value);
    };

    const createChannel = async () => {
        await axiosClient.post("/channel", {
            name: serverName,
            thumbnail: "",
            nickname: nickname,
            hashtag: hashtag,
        });
        updateMyInfo();
        handleClose();
    };
    return (
        <div>
            <h3>서버를 만들어보세요</h3>
            <h4>서버는 나와 친구들이 함께 어울리는 공간입니다. 내 서버를 만들고 대화를 시작해보세요.</h4>
            <input type="text" placeholder="서버 이름~" name="serverName" value={serverName} onChange={handleServerName} />
            <button onClick={createChannel}>생성</button>

            <hr />

            <h3>초대장 받았어?</h3>
            <input type="text" placeholder="입력 해~" />
            <button>입장</button>
        </div>
    );
};
CreateChannel.propTypes = {
    handleClose: PropTypes.func.isrequired,
};
export { CreateChannel };
