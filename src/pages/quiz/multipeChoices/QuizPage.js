import { Paper } from "@material-ui/core";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout";
import Question from "./Question";
import PrepareQuizPage from "./PrepareQuizPage";

const QuizPage = () => {
  const [questions, setQuestions] = useState();
  const [score, setScore] = useState(0);
  const [isStarted, setStart] = useState(false);
  const [currQues, setCurrQues] = useState(0);
  const [options, setOptions] = useState();

  const handleShuffle = (options) => {
    return options.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    if (isStarted) {
      setOptions(
        questions &&
          handleShuffle([
            questions[currQues]?.correct_answer,
            ...questions[currQues]?.incorrect_answers,
          ])
      );
    }
  }, [currQues, isStarted, questions]);

//   console.log(incorrectAnswers);

  const fetchQuestions = async () => {
    axios
      .get("https://opentdb.com/api.php?amount=10&category=17&type=multiple")
      .then((response) => {
        const res = response.data.results;
        setQuestions(res);
        setStart(true)
        console.log(res);
      })
      .catch((error) => [console.error(error)]);
  };

  return (
    <div>
      {options && isStarted ? (
        <div>
          <Paper>
            <Question
              currQues={currQues}
              setCurrQues={setCurrQues}
              questions={questions}
              correct={questions[currQues]?.correct_answer}
              score={score}
              options={options}
              setScore={setScore}
              setQuestions={setQuestions}
            />
          </Paper>
        </div>
      ) : (
        <PrepareQuizPage fetchQuestions={fetchQuestions} setStart={setStart} />
      )}
    </div>
  );
};

export default Layout(QuizPage);
