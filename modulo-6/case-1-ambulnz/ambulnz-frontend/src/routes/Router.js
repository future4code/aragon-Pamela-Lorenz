import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../pages/homePage/HomePage";
import SignupPage from "../pages/SignupPage/SignupPage";
import CartPage from "../pages/cartPage/CartPage";
import ErrorPage from "../pages/errorPage/ErrorPage";
import LoginPage from "../pages/LoginPage/LoginPage";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path={"/login"} element={<LoginPage />} />
        <Route path={"/signup"} element={<SignupPage />} />
        <Route path={"/menu"} element={<MenuPage />} />
        <Route path={"/orders"} element={<OrdersPage />} />
        <Route path={"*"} element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;