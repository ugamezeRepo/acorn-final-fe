import { ChannelMain } from "@components//channel/main/ChannelMain";
import { MyPageMain } from "@components/channel/main/MyPageMain";
import { MyPageNav } from "@components/channel/nav/MyPageNav";
import { useParams } from "react-router-dom";

const MyChannelView = () => {

    const { directMessageId } = useParams();
    return (
        <>
            <MyPageNav />

            {directMessageId != undefined ? (
                <ChannelMain />
            ) : (
                <MyPageMain />
            )}
        </>
    );
};

export { MyChannelView };