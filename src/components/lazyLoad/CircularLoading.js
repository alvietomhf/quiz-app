import { CircularProgress } from "@material-ui/core";
import React from "react";

const CircularLoading = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <CircularProgress style={{ margin: "auto" }} />
    </div>
  );
};

export default CircularLoading;
