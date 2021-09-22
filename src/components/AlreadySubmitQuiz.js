import { Box, Typography } from "@material-ui/core";
import React from "react";
import AlreadySubmit from "../assets/images/undraw_certification_aif8.svg";

const AlreadySubmitQuiz = ({ label }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="80vh"
    >
      <img
        src={AlreadySubmit}
        style={{ width: "280px", margin: "20px 0" }}
        alt=""
      />
      <Typography
        variant="body1"
        style={{ margin: "20px 0", fontWeight: 700, textAlign: "center" }}
        color="textPrimary"
      >
        Oops. Anda sudah mengikuti {label} ini...
      </Typography>
    </Box>
  );
};

export default AlreadySubmitQuiz;
