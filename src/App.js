import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./pages/auth/Login";
import PrivateRoutes from "./routes/PrivateRoutes";
import LandingPage from "./pages/general/guest/LandingPage";
import CircularLoading from "./components/lazyLoad/CircularLoading";
import Register from "./pages/auth/Register";
import ListUsersPage from "./pages/users/ListUsersPage";
import HomePage from "./pages/general/authenticated/HomePage";
import DetailPost from "./pages/general/authenticated/DetailPost";
import UserProfilePage from "./pages/users/UserProfilePage";
import HTMLEditorPage from "./pages/general/authenticated/HTMLEditorPage";
import DetailEssay from "./pages/quiz/uploadFiles/DetailEssay";
import EssayResultsPage from "./pages/quiz/uploadFiles/EssayResultsPage";

const QuizPage = lazy(() => import("./pages/quiz/multipeChoices/QuizPage"));
const QuizDetailPage = lazy(() =>
  import("./pages/quiz/multipeChoices/QuizDetailPage")
);
const EssayPage = lazy(() => import("./pages/quiz/uploadFiles/EssayPage"));
const AddEditQuizPage = lazy(() =>
  import("./pages/quiz/multipeChoices/AddEditQuizPage")
);

const PurposePage = lazy(() =>
  import("./pages/general/authenticated/PurposePage")
);
const ProfilePage = lazy(() =>
  import("./pages/general/authenticated/ProfilePage")
);

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact={true} path="/landing" component={LandingPage} />
        <Route exact={true} path="/login" component={Login} />
        <Route exact={true} path="/register" component={Register} />
        <Route exact={true} path="/users" component={ListUsersPage} />
        <PrivateRoutes exact={true} path="/" component={HomePage} />
        <PrivateRoutes
          exact={true}
          path="/htmleditor"
          component={HTMLEditorPage}
        />
        {/* <PrivateRoutes exact={true} path="/:id" component={DetailPost} /> */}
        <Suspense fallback={<CircularLoading />}>
          <PrivateRoutes exact={true} path="/profile" component={ProfilePage} />
          <PrivateRoutes
            exact={true}
            path="/users/:id"
            component={UserProfilePage}
          />
          <PrivateRoutes
            exact={true}
            path="/posts/:id"
            component={DetailPost}
          />
          <PrivateRoutes exact={true} path="/tujuan" component={PurposePage} />
          <PrivateRoutes exact={true} path="/quiz" component={QuizPage} />
          <PrivateRoutes
            exact={true}
            path="/quiz/add"
            component={AddEditQuizPage}
          />
          <PrivateRoutes
            exact={true}
            path="/quiz/edit/:slug"
            component={AddEditQuizPage}
          />
          <PrivateRoutes
            exact={true}
            path="/quiz/start/:slug"
            component={QuizDetailPage}
          />
          <PrivateRoutes exact={true} path="/essay" component={EssayPage} />
          <PrivateRoutes
            exact={true}
            path="/essay/start/:slug"
            component={DetailEssay}
          />
          <PrivateRoutes
            exact={true}
            path="/essay/result/:slug"
            component={EssayResultsPage}
          />
        </Suspense>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
