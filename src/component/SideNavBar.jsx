import SnbProfile from './SNBProfile'
import SNBServerName from './SNBServerName'
import SNBChannelGroup from './SNBChannelGroup'

const SideNavBar = () => {

        return (
            <div className="SnbContainer">
                <SNBServerName></SNBServerName>
                <SNBChannelGroup></SNBChannelGroup>
                <SnbProfile></SnbProfile>
            </div>
        );
}

export default SideNavBar;