import { SecureComponent } from "@components/SecureComponent";
import { AppContextProvider } from "@contexts/AppContextProvider";
import { ChannelPage } from "@pages/ChannelPage";
import { InvitePage } from "@pages/InvitePage";
import { LoginPage } from "@pages/LoginPage";
import { MyChannelPage } from "@pages/MyChannelPage";
import { MyDmPage } from "@pages/MyDmPage";
import { NotFoundPage } from "@pages/NotFoundPage";
import { RtcTestPage } from "@pages/RtcTestPage";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";


ReactDOM.createRoot(document.getElementById("root")).render(
    // <React.StrictMode>
    <BrowserRouter>
        <AppContextProvider>
            <Routes>
                <Route path="/channel/@me" element={<SecureComponent val={<MyChannelPage />} />} />
                <Route path="/channel/@me/:directMessageId" element={<SecureComponent val={<MyDmPage />} />} />
                <Route path="/channel/:channelId" element={<SecureComponent val={<ChannelPage />} />} />
                <Route path="/channel/:channelId/topic/:topicId" element={<SecureComponent val={<ChannelPage />} />} />
                <Route path="/invite/:inviteCode" element={<SecureComponent val={<InvitePage />} />} />
                <Route path="/" element={<SecureComponent val={<MyChannelPage />} />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/rtc" element={<RtcTestPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </AppContextProvider>
    </BrowserRouter>
    // </React.StrictMode>
);
