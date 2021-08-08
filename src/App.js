import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./pages/auth/Login";
import Home from "./pages/general/Home";
// import PrivateRoutes from "./routes/PrivateRoutes";
// import Cookies from "js-cookie";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/login' component={Login} />
        <Route exact path="/home" component={Home} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
