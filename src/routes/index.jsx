import { BrowserRouter, Route, Routes } from "react-router-dom";

import NotFoundPage from "@pages/NotFoundPage";
import WorkspacePage from "@pages/WorkspacePage";
import MyPage from "@pages/MyPage";
import { LoginPage } from "@pages/LoginPage";
import { RegisterPage } from "@pages/RegisterPage";
import { IndexPage } from "@pages/IndexPage";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<IndexPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/channels/@me/*" element={<MyPage />} />
                <Route path="/channels/*" element={<WorkspacePage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;