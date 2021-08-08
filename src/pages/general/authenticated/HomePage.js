import React from "react";
import { Button, Typography } from "@material-ui/core";
import Layout from "../../../components/Layout";

const Home = (props) => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Hello, {props.auth.data.name}
        {props.auth.data.role ===
          "guru" && (<Button variant="contained">Edit Guru</Button>)}
      </Typography>
    </div>
  );
};

export default Layout(Home);
