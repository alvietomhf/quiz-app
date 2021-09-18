import React, { useState, useEffect } from "react";
import { useTimer } from "react-timer-hook";
import { Link, useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Layout from "../../../components/Layout";
import { token } from "../../../config/token";
import instance from "../../../actions/instance";
import apiQuiz from "../../../actions/quiz/quiz";
import ResultQuizIndicator from "./ResultIndicator";

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
            console.log(responseMessage);
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
      <h2 className="text-center mb-3 mt-3">
        Quiz Screen - Timer: {minutes}:{seconds}
      </h2>
      <div className="card mb-3">
        <div
          className="card-body"
          style={{
            display: "flex",
            padding: 10,
            flexWrap: "wrap",
          }}
        >
          {quiz.map((item, index) => (
            <div
              key={index}
              className="border border-primary font-weight-bold"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: 40,
                width: 40,
                marginRight: 5,
                marginBottom: 5,
                borderRadius: 5,
                cursor: "pointer",
                backgroundColor:
                  index === currentIndex
                    ? "greenyellow "
                    : item?.selected
                    ? "grey"
                    : "transparent",
              }}
              onClick={() => setCurrentIndex(index)}
            >
              {index + 1}
            </div>
          ))}
        </div>
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
          {currentIndex + 1}. {question}
        </div>
        <div className="card-body">
          {options.map((item, index) => (
            <div
              style={{
                display: "flex",
                justifyItems: "center",
                alignItems: "center",
                fontSize: 18,
              }}
              key={index}
            >
              <div
                style={{
                  height: 20,
                  width: 20,
                  borderRadius: 100,
                  backgroundColor: item?.selected ? "greenyellow" : "grey",
                  cursor: "pointer",
                  marginRight: 5,
                }}
                onClick={() => selectOption(currentIndex, index)}
              />
              {item.title}
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingTop: 10,
        }}
      >
        <button
          className="btn btn-info col-sm-2"
          onClick={() => previousQuestion()}
          disabled={currentIndex === 0 ? true : false}
        >
          Previous
        </button>
        {quiz.length - 1 === currentIndex ? (
          <button
            className="btn btn-primary col-sm-2"
            onClick={() => postResultQuiz(quiz)}
          >
            Finish
          </button>
        ) : (
          <button
            className="btn btn-primary col-sm-2"
            onClick={() => nextQuestion()}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Layout(QuizDetailPage, "Quiz");
