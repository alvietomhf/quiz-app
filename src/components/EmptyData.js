import { Box, Typography } from "@material-ui/core";
import React from "react";
// import NotFoundSvg from "../assets/images/404NotFound.svg";
import Lottie from "react-lottie";
import NotFoundGif from "../assets/lottie/66934-tumbleweed-rolling.json";
const EmptyDataComponent = ({ label }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: NotFoundGif,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <Box display="inline-table">
      {/* <img
        src={NotFoundSvg}
        style={{ width: "280px", margin: "20px 0" }}
        alt=""
      /> */}
      <Lottie
        options={defaultOptions}
        width={400}
        style={{ cursor: "pointer" }}
      />
      <Typography
        variant="h6"
        style={{ margin: "20px 0", textAlign: "center" }}
        color="textPrimary"
      >
        Oops. {label} kosong nih...
      </Typography>
    </Box>
  );
};

export default EmptyDataComponent;
