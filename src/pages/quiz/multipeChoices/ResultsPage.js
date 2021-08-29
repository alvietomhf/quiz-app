import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";
import Layout from "../../../components/Layout";

const ResultsPage = () => {
  const history = useHistory();
  const location = useLocation();
  const resultQuiz = location.state.quiz;
  const scoreQuiz = location.state.score;
  useEffect(() => {
    if (!location.state) history.push("/quiz");
    console.log(location.state.quiz);
  }, [history, location]);

  return !location.state ? (
    <h1>Forbidden</h1>
  ) : (
    <div className="mt-3">
      <h1
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: 10,
        }}
      >
        Quiz Summary Score:{" "}
        <div className="text-success">{scoreQuiz.correct}</div>-{" "}
        <div className="text-danger"> {scoreQuiz.false}</div>
      </h1>
      {/* {resultQuiz.map((item, index) => (
        <div className="card mb-3" key={index}>
          <div className="card-header bg-white">
            <div className="font-weight-bold">No.{index + 1}</div>{" "}
            {item.question}
          </div>
          <div className="card-body">
            {item.options.map((item, index) => (
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
                />
                {item.title}
              </div>
            ))}
          </div>
          <img
            src={`http://192.168.0.9:8000/assets/images/quiz/${item.image}`}
            alt=""
          />
          <div className="card-footer bg-white">
            {item.options.find(
              (option) => option.correct && option.selected === option.correct
            ) ? (
              <div className="text-success">
                Your Answer: {item.options.find((item) => item.correct).title}
              </div>
            ) : (
              <>
                <div className="text-danger">
                  Your Answer :{" "}
                  {item.options.find((item) => item.selected)?.title ??
                    "You don't answer this question"}
                </div>
                <div className="text-success">
                  Correct Answer : {item.options.find((item) => item.correct).title}
                </div>
              </>
            )}
          </div>
        </div>
      ))} */}
    </div>
  );
};

export default Layout(ResultsPage);
