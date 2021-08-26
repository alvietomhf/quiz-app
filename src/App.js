import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./pages/auth/Login";
import PrivateRoutes from "./routes/PrivateRoutes";
import LandingPage from "./pages/general/guest/LandingPage";
import CircularLoading from "./components/lazyLoad/CircularLoading";
import QuizPage from "./pages/quiz/multipeChoices/QuizPage";
import QuizDetailPage from "./pages/quiz/multipeChoices/QuizDetailPage";
import AddQuizPage from "./pages/quiz/multipeChoices/AddQuizPage";
import Register from "./pages/auth/Register";

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
const SiswaPage = lazy(() => import("./pages/user/students/SiswaPage"));

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
            component={AddQuizPage}
          />
          <PrivateRoutes
            exact={true}
            path="/quiz/start/:slug"
            component={QuizDetailPage}
          />
          <PrivateRoutes
            exact={true}
            path="/quiz/result"
            component={ResultsPage}
          />
          <PrivateRoutes exact={true} path="/siswa" component={SiswaPage} />
        </Suspense>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
