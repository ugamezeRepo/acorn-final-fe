import GlobalNavBar from "@components/GlobalNavBar";
import SideNavBar from "@components/SideNavBar";
import Section from "@components/Section";
import ChannelMain from "@components/ChannelMain";

const MyPage = () => {
    return (
        <>
            <GlobalNavBar />
            <div className="container">
                <SideNavBar />
                <main className="main">
                    <Section></Section>
                    <ChannelMain />
                </main>
            </div>
        </>
    );
};

export default MyPage;  