import { ChannelContext } from "@contexts/ChannelContext";
import styled from "@emotion/styled";
import { axiosClient } from "@utils/axiosClient";
import { PropTypes } from "prop-types";
import { useContext, useState } from "react";

const Wrap = styled.div`
    min-width: 400px;
    padding:10px;
`;

const TopicForm = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    & > input {
        width:50%;
        height: 30px;
        border:1px solid #a1a1a1;
        border-radius: 5px;
    }
    & > button {
        width:30%;
        height: 30px;
        border:1px solid #a1a1a1;
        border-radius: 5px;
    }
    & > button:hover {
        background-color:#2e7d32;
        color: #ffffff;
    }
`;

const CreateTopic = ({ handleClose }) => {
    const { currentChannel, setTopics } = useContext(ChannelContext);
    const [title, setTitle] = useState("");

    const handleTitle = (e) => {
        setTitle(e.target.value);
    };

    const createTopic = async () => {
        const { data } = await axiosClient.post(`/channel/${currentChannel?.id}/topic`, {
            title: title
        });
        setTopics(topics => [...topics, data]);
        handleClose();
    };

    return (
        <Wrap>
            <h3>토픽을 만들어보세요</h3>
            <TopicForm>
                <input type="text" placeholder="토픽 이름" name="title" value={title} onChange={handleTitle} />
                <button onClick={createTopic}>생성</button>
            </TopicForm>
        </Wrap>
    );
};
CreateTopic.propTypes = {
    handleClose: PropTypes.func.isRequired,
};
export { CreateTopic };
