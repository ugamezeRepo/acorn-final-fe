import { MyPageMain } from "@components/channel/main/MyPageMain";
import { MyPageNav } from "@components/channel/nav/MyPageNav";
const MyChannelView = () => {
    return (
        <>
            <MyPageNav />
            <MyPageMain />
        </>
    );
};

export { MyChannelView };