import React, { useState, useEffect } from "react";
import { useTimer } from "react-timer-hook";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Layout from "../../../components/Layout";
import { token } from "../../../config/token";
import instance from "../../../actions/instance";
import apiQuiz from "../../../actions/quiz/quiz";
import ResultQuizIndicator from "../../../components/ResultIndicator";
import { Box, Button, Grid, Typography } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

const QuizDetailPage = () => {
  const { slug } = useParams();
  const history = useHistory();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [quiz, setQuiz] = useState([{}]);
  const [score, setScore] = useState({
    correct: 0,
    false: 0,
  });
  const [open, setOpen] = useState(false);

  const { file, question, options = [] } = quiz[currentIndex];

  useEffect(() => {
    const fetchDetailQuiz = async () => {
      instance
        .get(`/api/quizzes/${slug}`, {
          headers: {
            Authorization: "Bearer " + token(),
          },
        })
        .then((response) => {
          const data = response.data.data.questions;
          setQuiz(data);
        })
        .catch((error) => {
          if (error.response.data.status === false) {
            setError(true);
            const responseMessage = error.response.data.message;
            setMessage(responseMessage);
            setTimeout(() => {
              history.push("/quiz");
            }, 4000);
          }
        });
    };
    fetchDetailQuiz();
  }, [history, slug]);

  useEffect(() => {
    const questionAnswered = quiz.filter((item) => item.selected);
    const questionCorrect = questionAnswered.filter((item) =>
      item.options.find(
        (option) => option.correct && option.selected === option.correct
      )
    );
    setScore({
      correct: questionCorrect.length,
      false: quiz.length - questionCorrect.length,
    });
  }, [quiz]);

  const nextQuestion = () => {
    if (quiz.length - 1 === currentIndex) return;
    setCurrentIndex(currentIndex + 1);
  };

  const previousQuestion = () => {
    if (currentIndex === 0) return;
    setCurrentIndex(currentIndex - 1);
  };

  const postResultQuiz = async (quiz) => {
    const data = JSON.stringify(quiz);
    console.log(data);
    apiQuiz
      .postResultQuiz(data, slug)
      .then((res) => {
        console.log(res.data);
        setOpen(true);
        setTimeout(() => {
          history.push("/quiz");
          setOpen(false);
        }, 4000);
      })
      .catch((errors) => {
        const error = errors;
        history.push("/quiz");
        console.log(error);
      });
  };

  const MINUTES = 900;
  const time = new Date();
  time.setSeconds(time.getSeconds() + MINUTES);

  const { seconds, minutes } = useTimer({
    expiryTimestamp: time,
    onExpire: () => setCurrentIndex(quiz.length - 1),
  });

  const selectOption = (indexSelected, indexOptionSelected) => {
    setQuiz(
      quiz.map((item, index) =>
        index === indexSelected
          ? {
              ...item,
              selected: 1,
              options: options.map((item, index) =>
                index === indexOptionSelected
                  ? { ...item, selected: 1 }
                  : { ...item, selected: 0 }
              ),
            }
          : item
      )
    );
  };

  if (error) {
    return <div>{message}</div>;
  }

  return (
    <div>
      <ResultQuizIndicator open={open} setOpen={setOpen} />
      <Box display="flex">
        <Typography
          variant="h5"
          color="textSecondary"
          style={{ marginLeft: "auto" }}
        >
          Time Left: {minutes}:{seconds}
        </Typography>
      </Box>
      <div style={{ margin: "10px 0" }}>
        <Box display="flex" padding="10px" flexWrap="wrap">
          {quiz.map((item, index) => (
            <Box
              width="40px"
              height="40px"
              margin="0 5px 5px 0"
              display="flex"
              justifyContent="center"
              alignItems="center"
              borderRadius="5px"
              key={index}
              style={{
                color:
                  index === currentIndex
                    ? "white"
                    : item?.selected
                    ? "white"
                    : "black",
                cursor: "pointer",
                backgroundColor:
                  index === currentIndex
                    ? "#388E3C"
                    : item?.selected
                    ? "grey"
                    : "transparent",
              }}
              onClick={() => setCurrentIndex(index)}
            >
              {index + 1}
            </Box>
          ))}
        </Box>
      </div>
      {file ? (
        <img
          style={{ width: 240 }}
          src={`http://192.168.0.8:8000/assets/files/quiz/${file}`}
          alt=""
        />
      ) : (
        ""
      )}
      <div className="card">
        <div
          className="card-header bg-white font-weight-bold"
          style={{
            fontSize: 20,
          }}
        >
          <Typography variant="h4" style={{ fontWeight: 700 }}>
            {question}
          </Typography>
        </div>
        <Grid container spacing={2} style={{ margin: "10px 0" }}>
          {options.map((item, index) => (
            <Grid item lg={6} key={index} xs={12}>
              <Box
                padding={2}
                display="flex"
                alignItems="center"
                color="white"
                bgcolor={item?.selected ? "#388E3C" : "rgba(0, 0, 0, 0.6)"}
                borderRadius="100px"
                style={{
                  cursor: "pointer",
                }}
                onClick={() => selectOption(currentIndex, index)}
              >
                <Typography
                  variant="body1"
                  style={{ fontWeight: 600, wordBreak: "break-word" }}
                >
                  {item.title}
                </Typography>
                {item?.selected ? (
                  <CheckCircleIcon style={{ marginLeft: "auto" }} />
                ) : (
                  ""
                )}
              </Box>
            </Grid>
          ))}
        </Grid>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 10,
        }}
      >
        <Button
          color="secondary"
          variant="contained"
          style={{ marginRight: 10 }}
          onClick={() => previousQuestion()}
          disabled={currentIndex === 0 ? true : false}
        >
          Previous
        </Button>
        {quiz.length - 1 === currentIndex ? (
          <Button
            variant="contained"
            color="primary"
            onClick={() => postResultQuiz(quiz)}
          >
            Finish
          </Button>
        ) : (
          <Button
            color="primary"
            variant="contained"
            onClick={() => nextQuestion()}
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default Layout(QuizDetailPage, "Quiz");
