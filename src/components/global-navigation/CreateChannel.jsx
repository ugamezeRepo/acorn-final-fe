import { MemberContext } from "@contexts/MemberContext";
import { axiosClient } from "@utils/axiosClient";
import { useContext, useState } from "react";

const CreateChannel = () => {
    const { nickname, hashtag, setChannels } = useContext(MemberContext);
    const [serverName, setServerName] = useState("");

    const handleServerName = (e) => {
        setServerName(e.target.value);
    };

    const createChannel = async () => {
        const { data: newChannel } = await axiosClient.post("/channel", {
            name: serverName,
            thumbnail: "",
            nickname: nickname,
            hashtag: hashtag,
        });
        setChannels(channels => [...channels, newChannel]);
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
export { CreateChannel };