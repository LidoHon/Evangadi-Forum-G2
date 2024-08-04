import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import AnswerUI from "../pages/answer_Questions/AnswerUI";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import UpdateUser from "../pages/UpdateUser";
import ProfilePage from "../pages/ProfilePage";
import NotFound from "../pages/NotFound";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/update-profile/" element={<UpdateUser />} />
        <Route path="/Profile/" element={<ProfilePage />} />
        <Route path="/questions/id" element={<AnswerUI />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Route>
  )
);

const Routing = () => {
  return <RouterProvider router={routes} />;
};

export default Routing;
