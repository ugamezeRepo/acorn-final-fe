import GlobalNavBar from "../component/GlobalNavBar";
import Section from "../component/Section";
import SideNavBar from "../component/SideNavBar";


const WorkspacePage = () =>{
    return (
        <>
            <GlobalNavBar/>
            <div className="container">
                <SideNavBar/>
                <main className="main">
                    <Section></Section>

                </main>
            </div>
            
        </>
    )
}

export default WorkspacePage; 