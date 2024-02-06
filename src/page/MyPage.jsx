const MyPage = () => {
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

export default MyPage;  