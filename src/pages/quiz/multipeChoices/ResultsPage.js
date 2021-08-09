import { Button, Typography } from "@material-ui/core";
import React from "react";
import Layout from "../../../components/Layout";
import { deleteScore } from "../../../actions/quiz/quizAction";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { DELETE_SCORE_QUIZ } from "../../../constants/types";

const ResultsPage = (props) => {
  const dispatch = useDispatch();
  const quiz = useSelector((state) => state.quiz);
  const handleBack = () => {
    dispatch({
      type: DELETE_SCORE_QUIZ,
      action: 0,
    });
    <Redirect to="quiz" />;
  };
  return (
    <div>
      <Typography variant="h2">{props.auth.data.name}</Typography>
      <Typography variant="h2">Score: {quiz.score}</Typography>
      <Button variant="contained" onClick={handleBack}>
        Try Again
      </Button>
    </div>
  );
};

export default Layout(ResultsPage);
