import React, { forwardRef } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
// import successAnim from "../assets/images/checkbutton.gif";
import { Box } from "@material-ui/core";
import CheckButton from "../assets/lottie/52058-check.json";
import Lottie from "react-lottie";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ResultQuizIndicator = ({ setOpen, open }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: CheckButton,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  // const handleClose = () => {
  //   setOpen(false);
  // };
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={(event, reason) => {
        if (reason !== "backdropClick") {
          setOpen(true);
        }
      }}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">Pemberitahuan</DialogTitle>
      <DialogContent>
        <Box
          display="flex"
          justifyContent="center"
          width="100%"
          alignItems="center"
          marginBottom={2}
        >
          <Lottie options={defaultOptions} width={200} />
        </Box>
        <DialogContentText
          style={{ padding: "15px 0" }}
          align="center"
          id="alert-dialog-slide-description"
        >
          Selamat! Anda telah mengerjakan kuis. Tunggu hasilnya ya!
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default ResultQuizIndicator;
