import { ChannelContext } from "@contexts/ChannelContext";
import { axiosClient } from "@utils/axiosClient";
import { PropTypes } from "prop-types";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";


const SetTopic = ({ handleClose }) => {
    const { currentChannel, currentTopic, setCurrentTopic } = useContext(ChannelContext);
    const [title, setTitle] = useState(currentTopic.title || "");
    const navigate = useNavigate();

    const handleTopicName = (e) => {
        setTitle(e.target.value);
    };

    const ChangeTopicName = async () => {
        const { data } = await axiosClient.patch(`/channel/${currentChannel.id}/topic/${currentTopic.id}`, {
            id: currentTopic.id,
            title: title
        });
        setCurrentTopic(data);
        navigate(`/channel/${currentChannel.id}/topic/${currentTopic.id}`);
        handleClose();
    };

    const deleteTopic = async () => {
        const confirm = window.confirm("진짜 삭제할겨?");
        if (confirm) {
            await axiosClient.delete(`/channel/${currentChannel.id}/topic/${currentTopic.id}`);
            navigate(`/channel/${currentChannel.id}`);
        }
        handleClose();
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
SetTopic.propTypes = {
    handleClose: PropTypes.func.isRequired,
};
export { SetTopic };
