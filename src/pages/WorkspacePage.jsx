import GlobalNavBar from "@components/GlobalNavBar";
import SideNavBar from "@components/SideNavBar";
import ChannelMain from "@components/ChannelMain";


const WorkspacePage = () => {
    return (
        <>
            <GlobalNavBar />
            <div className="container">
                <SideNavBar />
                <main className="main">
                    <ChannelMain />
                </main>
            </div>

        </>
    );
};

export default WorkspacePage; 