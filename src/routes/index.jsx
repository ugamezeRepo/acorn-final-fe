import { BrowserRouter, Route, Routes } from "react-router-dom";

import NotFoundPage from "../page/NotFoundPage";
import WorkspacePage from '../page/WorkspacePage';
import MyPage from '../page/MyPage';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
            <Route path="/channels/@me/*" element={<MyPage/>}/>
            <Route path="/channels/*" element={<WorkspacePage/>} />
            <Route path="/*" element={<NotFoundPage/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter; 