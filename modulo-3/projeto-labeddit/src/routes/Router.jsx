import { BrowserRouter, Routes, Route } from "react-router-dom.jsx"
import ErrorPage from "../pages/ErrorPage.jsx"
import FeedPage from "../pages/FeedPage.jsx"
import PostDetails from "../paginas/PostDetails.jsx"
import LoginPage from "../pages/LoginPage.jsx"
import SignUpPage from "../pages/SignUpPage.jsx"

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<FeedPage />} />
                <Route path={"/login"} element={<LoginPage />} />
                <Route path={"/signup"} element={<SignUpPage />} />
                <Route path={"post/:postId"} element={<PostDetails />} />
                <Route path={"*"} element={<ErrorPage />} />
            </Routes>
        </BrowserRouter>
    )
}