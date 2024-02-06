import ChatBar from "../component/ChatBar";
import GlobalNavBar from "../component/GlobalNavBar";
import Section from "../component/Section";
import SideNavBar from "../component/SideNavBar";
import ChannelMain from "../component/ChannelMain";


const WorkspacePage = () =>{
    return (
        <>
            <GlobalNavBar/>
            <div className="container">
                <SideNavBar/>
                <main className="main">
                    <Section></Section>
                    <ChannelMain/>
                </main>
            </div>
            
        </>
    )
}

export default WorkspacePage; 