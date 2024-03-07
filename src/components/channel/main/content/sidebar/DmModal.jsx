import { axiosClient } from "@utils/axiosClient";

const DmModal = () => {
    const DirectMessage = async () => {
        await axiosClient.post(`/channel/@me/`, {

        });
    };
    return (
        <>
            <button onClick={DirectMessage}>메세지 보내기</button>
        </>
    );
};

export { DmModal };