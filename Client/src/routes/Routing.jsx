import React, { useState } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import RegisterPage from "../pages/RegisterPage";
import Login from "../components/Login";
import NotFound from "../pages/NotFound";
import UpdateUser from "../pages/UpdateUser";
import AllQuestion from "../pages/AllQuestions";
import SavedQuestions from "../pages/SavedQuestions";
import PrivateRoute from "../components/PrivateRoutes";
import AskQuestion from "../pages/askQuestion/askQuestion";
import AnswerUI from "../pages/answer_Questions/AnswerUI";
import EditQuestionPage from "../pages/EditQuestionPage";
import HowItWorks from "../pages/HowItWorks";
import Landing from "../pages/landing/Landing";
const Routing = () => {
  const [savedQuestions, setSavedQuestions] = useState([]);

  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        {/* <Route index element={<Landing />} /> */}

        <Route path="/" element={<MainLayout />}>
          <Route element={<PrivateRoute />}>
            <Route
              path="/questions"
              element={
                <AllQuestion
                  savedQuestions={savedQuestions}
                  setSavedQuestions={setSavedQuestions}
                />
              }
            />
            <Route
              path="/saved-questions"
              element={
                <SavedQuestions
                  savedQuestions={savedQuestions}
                  setSavedQuestions={setSavedQuestions}
                />
              }
            />
            <Route path="/ask-question" element={<AskQuestion />} />
            <Route path="/questions/:questionid" element={<AnswerUI />} />
            <Route
              path="/questions/edit/:questionid"
              element={<EditQuestionPage />}
            />
            <Route path="/update-profile/" element={<UpdateUser />} />
          </Route>
          <Route path="/" element={<Landing />} />
          <Route path="/howItWorks" element={<HowItWorks />} />

          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={routes} />;
};

export default Routing;
