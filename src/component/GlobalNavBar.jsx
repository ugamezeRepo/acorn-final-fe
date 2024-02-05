import Nav from './SideNavBar';
import GNBServerBlock from './GNBServerBlock';


const GlobalNavBar = () => {
        return (
            <>
                <div className="GnbContainer">
                <ul>
                    <GNBServerBlock url={'/Channel/@me'} description={'direct message'} thumbnail=''/>
                    <hr />
                    <GNBServerBlock/>
                    <GNBServerBlock/>
                    <GNBServerBlock/>
                    <GNBServerBlock/>
                    <GNBServerBlock/>
                    <GNBServerBlock/>
                </ul>
                </div>
                <Nav></Nav>
            </>
        );
    }

export default GlobalNavBar;