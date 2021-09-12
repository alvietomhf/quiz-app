import { Paper } from "@material-ui/core";
import React from "react";
import { useLocation } from "react-router-dom";
import Layout from "../../../components/Layout";

const DetailPost = () => {
  const location = useLocation();
  console.log(location)
  return <Paper style={{ padding: 20 }}>{location.state.post.id}</Paper>;
};

export default Layout(DetailPost);
