import { MemberContext } from "@contexts/MemberContext";
import { axiosClient } from "@utils/axiosClient";
import { useContext, useState } from "react";

const CreateTopic = () => {
    const { channels, setChannels } = useContext(MemberContext);
    const [title, setTitle] = useState("");

    const handleTitle = (e) => {
        setTitle(e.target.value);
    };

    const createTopic = async () => {
        const { data: newTitle } = await axiosClient.post(`/channel/${channels.id}/topic`, {
            id: channels.id,
            title: title
        });
        setChannels(channels => [...channels, newTitle]);
    };

    return (
        <div>
            <h3>토픽을 만들어보세요</h3>
            <input type="text" placeholder="토픽 이름" name="title" onChange={handleTitle} />
            <button onClick={createTopic}>생성</button>
        </div>
    );
};
export { CreateTopic };