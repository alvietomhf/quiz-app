import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./pages/auth/Login";
// import LoadingProgress from "./components/lazyLoad/LoadingProgress";
import PrivateRoutes from "./routes/PrivateRoutes";
import LandingPage from "./pages/general/guest/LandingPage";
import CircularLoading from "./components/lazyLoad/CircularLoading";
const HomePage = lazy(() => import("./pages/general/authenticated/HomePage"));
const PurposePage = lazy(() => import("./pages/general/authenticated/PurposePage"));
const ProfilePage = lazy(() => import("./pages/general/authenticated/ProfilePage"));

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
        </Suspense>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
