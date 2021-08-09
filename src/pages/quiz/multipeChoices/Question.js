import { Button, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// import { addScore } from "../../../actions/quiz/quizAction";
import { ADD_SCORE_QUIZ } from "../../../constants/types";

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
  const [error, setError] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const addScore = useSelector((state) => state.quiz.score)

  //   const handleSelect = (i) => {
  //     if (selected === i && selected === correct) return "primary";
  //     else if (selected === i && selected !== correct) return "secondary";
  //     else if (i === correct) return "select";
  //   };

  const handleNext = () => {
    if (currQues > 8) {
      history.push("/quiz/result");
    } else if (selected) {
      setCurrQues(currQues + 1);
      setSelected();
    } else setError("Please select an option first");
  };

  const handleQuit = () => {
    setCurrQues(0);
    setQuestions();
  };

  const handleCheck = (i) => {
    setSelected(i);
    if (i === correct) {
      setScore(score + 1);
      dispatch({
          type: ADD_SCORE_QUIZ,
          action: addScore + 1
      });
    }
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
            <Button
              style={{ marginBottom: 10, width: "100%" }}
              size="large"
              key={i}
              variant="contained"
              color={selected ? "primary" : "secondary"}
              onClick={() => handleCheck(i)}
              disabled={selected ? true : false}
            >
              {i}
            </Button>
          ))}
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
