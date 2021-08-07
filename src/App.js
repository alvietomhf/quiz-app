import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from "./pages/auth/Login";
import Home from "./pages/general/Home";
import PrivateRoutes from "./routes/PrivateRoutes";
// import Cookies from "js-cookie";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/login' component={Login} />
        <PrivateRoutes exact path="/home" component={Home} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
