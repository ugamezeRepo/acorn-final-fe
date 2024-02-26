import { ChannelPage } from "@pages/ChannelPage";
import { NotFoundPage } from "@pages/NotFoundPage";
import { RtcTestPage } from "@pages/RtcTestPage";
import { SignupPage } from "@pages/SignupPage";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";


ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/channel/:channelId/topic/:topicId" element={<ChannelPage />} />
                <Route path="/rtc" element={<RtcTestPage />} />
                <Route path="/404" element={<NotFoundPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="*" element={<Navigate to="/channel/1/topic/1" />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
);
