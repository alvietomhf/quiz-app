import { Typography } from "@material-ui/core";
import React from "react";
import NotFoundSvg from "../assets/images/404NotFound.svg";

const EmptyDataComponent = ({ label }) => {
  return (
    <div>
      <img
        src={NotFoundSvg}
        style={{ width: "280px", margin: "20px 0" }}
        alt=""
      />
      <Typography
        variant="h6"
        style={{ margin: "20px 0", textAlign: "center" }}
        color="textPrimary"
      >
        Oops. {label} kosong nih...
      </Typography>
    </div>
  );
};

export default EmptyDataComponent;
