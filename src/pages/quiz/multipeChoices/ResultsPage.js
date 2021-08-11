import { Button, Typography } from "@material-ui/core";
import React from "react";
import Layout from "../../../components/Layout";
// import { deleteScore } from "../../../actions/quiz/quizAction";
// import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// import { ADD_SCORE_QUIZ, DELETE_SCORE_QUIZ } from "../../../constants/types";

const ResultsPage = (props) => {
  // const dispatch = useDispatch();

  const history = useHistory();
  const handleBack = () => {
    history.push("/quiz");
    // dispatch({
    //   type: DELETE_SCORE_QUIZ,
    //   action: 0,
    // });
  };
  return (
    <div>
      <Typography variant="h2">{props.auth.data.name}</Typography>
      <Typography variant="h2">Correct: {props.location.state.score.correct}</Typography>
      <Typography variant="h2">False: {props.location.state.score.false}</Typography>
      <Button variant="contained" onClick={handleBack}>
        Try Again
      </Button>
    </div>
  );
};

export default Layout(ResultsPage);
