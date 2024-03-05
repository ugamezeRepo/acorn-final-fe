import { ChannelContext } from "@contexts/ChannelContext";
import { axiosClient } from "@utils/axiosClient";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";


const SetTopic = () => {
    const { currentChannel, currentTopic, setCurrentTopic } = useContext(ChannelContext);
    const [title, setTitle] = useState(currentTopic.title || null);
    const navigate = useNavigate();

    // useEffect(() => {
    //     setTitle(currentTopic.title);
    // }, [currentTopic.title]);


    const handleTopicName = (e) => {
        setTitle(e.target.value);
    };

    const ChangeTopicName = async () => {
        const { data } = await axiosClient.post(`/channel`, {
            title: title
        });
        setCurrentTopic(title => [...title, data]);
    };

    const deleteTopic = async () => {
        console.log(currentChannel.id);
        console.log(currentTopic.id);
        const confirm = window.confirm("진짜 삭제할겨?");
        if (confirm) {
            await axiosClient.delete(`/channel/${currentChannel.id}/topic/${currentTopic.id}`);
            navigate("/channel/@me");
        }
    };

    return (
        <>
            <h3>토픽 이름</h3>
            <input type="text" placeholder="채널 이름" value={title}
                onChange={handleTopicName} autoFocus />
            <button onClick={ChangeTopicName}>변경하기</button>
            <hr />
            <h3>토픽 삭제</h3>
            <button onClick={deleteTopic}>삭제</button>
        </>
    );
};
export { SetTopic };