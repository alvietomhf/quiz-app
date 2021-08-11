import { Button, Snackbar, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./Question.css";
// // import { addScore } from "../../../actions/quiz/quizAction";
// import { ADD_SCORE_QUIZ } from "../../../constants/types";

const Question = ({
  currQues,
  setCurrQues,
  questions,
  correct,
  setScore,
  score,
  setQuestions,
  options,
}) => {
  const [selected, setSelected] = useState();
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [state, setState] = useState({
    vertical: "bottom",
    horizontal: "center",
  });
  const { vertical, horizontal } = state;

  const handleClose = () => {
    setTimeout(() => {
      setOpen(false);
      setError(false);
    }, 1000);
  };
  const history = useHistory();

  const handleSelect = (i) => {
    if(selected === i) {
      return 'primary'
    }
  };

  const handleNext = () => {
    if (currQues > 8) {
      history.push({
        pathname: "/quiz/result",
        state: {
          score: score,
        },
      });
    } else if (selected) {
      setCurrQues(currQues + 1);
      setSelected();
    } else {
      setError(true);
      setMessage("Please select options first.");
    }
  };

  const handleQuit = () => {
    setCurrQues(0);
    setQuestions();
  };

  const handleCheck = (i) => {
    setSelected(i);
    if (i === correct) {
      setScore(score + 1);
    }
    setError(false);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 30,
        justifyContent: "center",
      }}
    >
      <Typography variant="h4">Question {currQues + 1} :</Typography>
      <Typography style={{ marginBottom: 10 }} variant="body1">
        Score: {score}
      </Typography>
      <Typography style={{ marginBottom: 10 }} variant="h5">
        {questions[currQues].question}
      </Typography>
      {error && (
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={error ? true : false}
          key={vertical + horizontal}
          onClose={handleClose}
          autoHideDuration={500}
        >
          <Alert onClose={handleClose} severity="error">
            {message}
          </Alert>
        </Snackbar>
      )}
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignSelf: "center",
        }}
      >
        {options &&
          options.map((i) => (
            <button
              className={`${selected && handleSelect(i)}`}
              key={i}
              onClick={() => handleCheck(i)}
            >
              {i}
            </button>
          ))}
        {/* <Button
              style={{ marginBottom: 10, width: "100%" }}
              size="large"
              key={i}
              variant="contained"
              color={selected ? "primary" : "secondary"}
              onClick={() => handleCheck(i)}
              disab={selected ? true : false}
            >
              {i}
            </Button> */}
      </div>
      <div style={{ display: "flex", marginTop: 10 }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          style={{ width: 185, margin: 10, marginRight: "auto" }}
          onClick={handleNext}
        >
          {currQues > 10 ? "Submit" : "Next Question"}
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          style={{ width: 185, marginBottom: 10, marginLeft: "auto" }}
          href="/"
          onClick={() => handleQuit()}
        >
          Quit
        </Button>
      </div>
    </div>
  );
};

export default Question;
