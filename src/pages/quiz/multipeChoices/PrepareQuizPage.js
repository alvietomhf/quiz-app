import { Button } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";

const PrepareQuizPage = ({ fetchQuestions, setStart }) => {
  const history = useHistory();
  const handleSubmit = () => {
    fetchQuestions();
    setStart(true)
  };
  return (
    <div>
      <Button onClick={handleSubmit} color='primary' variant='contained'>
        Start Quiz
      </Button>
    </div>
  );
};

export default PrepareQuizPage;
