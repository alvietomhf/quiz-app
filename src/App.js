import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./pages/auth/Login";
import PrivateRoutes from "./routes/PrivateRoutes";
import LandingPage from "./pages/general/guest/LandingPage";
import CircularLoading from "./components/lazyLoad/CircularLoading";
import Register from "./pages/auth/Register";

const QuizPage = lazy(() => import("./pages/quiz/multipeChoices/QuizPage"));
const QuizDetailPage = lazy(() =>
  import("./pages/quiz/multipeChoices/QuizDetailPage")
);
const EssayPage = lazy(() => import("./pages/quiz/uploadFiles/EssayPage"));
const AddEditQuizPage = lazy(() =>
  import("./pages/quiz/multipeChoices/AddEditQuizPage")
);
const AddEditEssayPage = lazy(() =>
  import("./pages/quiz/uploadFiles/AddEditEssayPage")
);
const ResultsPage = lazy(() =>
  import("./pages/quiz/multipeChoices/ResultsPage")
);
const HomePage = lazy(() => import("./pages/general/authenticated/HomePage"));
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
        <Route exact={true} path="/" component={LandingPage} />
        <Route exact={true} path="/login" component={Login} />
        <Route exact={true} path="/register" component={Register} />

        <Suspense fallback={<CircularLoading />}>
          <PrivateRoutes exact={true} path="/home" component={HomePage} />
          <PrivateRoutes exact={true} path="/profile" component={ProfilePage} />
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
            component={QuizDetailPage}
          />
          <PrivateRoutes
            exact={true}
            path="/essay/add"
            component={AddEditEssayPage}
          />
          <PrivateRoutes
            exact={true}
            path="/essay/edit/:slug"
            component={AddEditEssayPage}
          />
          <PrivateRoutes
            exact={true}
            path="/quiz/result"
            component={ResultsPage}
          />
        </Suspense>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
