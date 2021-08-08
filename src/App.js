import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./pages/auth/Login";
import Home from "./pages/general/Home";
// import LinearLoading from "./components/lazyLoad/LinearLoading";
import LoadingProgress from "./components/lazyLoad/LoadingProgress";
import PrivateRoutes from "./routes/PrivateRoutes";
// const Home = lazy(() => import("./pages/general/Home"));
// const Login = lazy(() => import("./pages/auth/Login"));

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        <PrivateRoutes exact path="/home" component={Home} />
        {/* <Suspense fallback={<LoadingProgress />}>

        </Suspense> */}
      </Switch>
    </BrowserRouter>
  );
};

export default App;
