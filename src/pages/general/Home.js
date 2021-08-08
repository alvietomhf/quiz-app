import React from "react";
import { Typography } from "@material-ui/core";
import Layout from "../../components/Layout";

const Home = (props) => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Hello, {props.auth.data.user.name}
      </Typography>
    </div>
  );
};

export default Layout(Home);
