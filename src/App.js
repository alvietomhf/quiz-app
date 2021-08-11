import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./pages/auth/Login";
// import LoadingProgress from "./components/lazyLoad/LoadingProgress";
import PrivateRoutes from "./routes/PrivateRoutes";
import LandingPage from "./pages/general/guest/LandingPage";
import CircularLoading from "./components/lazyLoad/CircularLoading";
import QuizDev from "./pages/quiz/multipeChoices/quizDev";

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
const QuizPage = lazy(() => import("./pages/quiz/multipeChoices/QuizPage"));

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/login" component={Login} />
        <Suspense fallback={<CircularLoading />}>
          <PrivateRoutes exact path="/home" component={HomePage} />
          <PrivateRoutes exact path="/profile" component={ProfilePage} />
          <PrivateRoutes exact path="/tujuan" component={PurposePage} />
          {/* <PrivateRoutes exact path="/quiz" component={QuizPage} /> */}
          <PrivateRoutes exact path="/quiz/result" component={ResultsPage} />
          <PrivateRoutes exact path="/quiz/dev" component={QuizDev} />
        </Suspense>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
