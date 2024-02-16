import { ChannelPage } from "@pages/ChannelPage";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/channel/:channelId/topic/:topicId" element={<ChannelPage />} />
                <Route path="*" element={<Navigate to={"/channel/1/topic/1"} />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;