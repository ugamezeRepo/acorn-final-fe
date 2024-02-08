import { useState } from "react";
import SideChannelBlock from "@components/SideChannelBlock";
import Profile from "@components/SNBProfile";
import SNBServerName from "@components/SNBServerName";

const SideNavBar = () => {
    const [chList, _setChList] = useState([
        {
            name: "첫번째 채널"
        },
        {
            name: "두번째 채널"
        },
        {
            name: "세번째 채널"
        },
        {
            name: "네번째 채널"
        },
        {
            name: "다섯번째 채널"
        }
    ]);
    const [view, setView] = useState(false);

    const open = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-right-fill" viewBox="0 0 16 16">
        <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
    </svg>;
    const close = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
    </svg>;

    return (
        <div className="SnbContainer">
            <SNBServerName></SNBServerName>
            <ul onClick={() => { setView(!view); }}>
                {view ? close : open}
                그룹명
                {view && chList.map((c, index) => (
                    <li key={index}>
                        <SideChannelBlock name={c.name} type={c.type} />
                    </li>
                ))}
            </ul>
            <div>
                <Profile />
            </div>
        </div>
    );
};

export default SideNavBar;