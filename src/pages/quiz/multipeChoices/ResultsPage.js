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
    console.log(resultQuiz);
  }, [history, location, resultQuiz]);

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
        <br />
        {resultQuiz.map((item, index) => (
          <div key={index}>
            <div className="card-header bg-white">
              <div className="font-weight-bold">No.{index + 1}</div>{" "}
              {item.question}
            </div>
            <div>
              {item.options.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyItems: "center",
                    alignItems: "center",
                    fontSize: 18,
                  }}
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
                  >
                    {item.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </h1>
    </div>
  );
};

export default Layout(ResultsPage, 'Hasil Quiz');
