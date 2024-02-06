import { useState } from "react";
import SideChannelBlock from "./SideChannelBlock";
import Profile from './snbProfile'

const SideNavBar = () => {
    const [chList, setChList]  = useState([
        {
            name:'첫번째 채널'
        },
        {
            name:'두번째 채널'
        },
        {
            name:'세번째 채널'
        },
        {
            name:'네번째 채널'
        },
        {
            name:'다섯번째 채널'
        }
    ]);

        return (
            <div className="SnbContainer">
                <ul>
                    {chList.map((c, index) => (
                        <li key={index}>
                            <SideChannelBlock name={c.name} />
                        </li>
                    ))}
                </ul>
                <div>
                    <Profile/>
                </div>
            </div>
        );
}

export default SideNavBar;