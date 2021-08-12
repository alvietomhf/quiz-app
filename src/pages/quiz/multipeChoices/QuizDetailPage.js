import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { useTimer } from "react-timer-hook";
import apiQuiz from "../../../actions/quiz/quiz";
import Layout from "../../../components/Layout";

const QuizDetailPage = () => {
  const { slug } = useParams();
  const [quiz, setQuiz] = useState();
//   const [questions, setQuestions] = useState([]);
  const [state, setState] = useState([
    {
      question: "",
      options: [],
    },
  ]);
  const [currentIndex, setCurrentIndex] = useState();
  const [score, setScore] = useState({
    correct: 0,
    false: 0,
  });

  //   const { question, options } = quiz[currentIndex];

  const auth = useSelector((state) => state.auth);

  //   const MINUTES = 120 * 60;
  //   const time = new Date();
  //   time.setSeconds(time.getSeconds() + MINUTES);

  //   const { seconds, minutes, hours } = useTimer({
  //     expiryTimestamp: time,
  //     onExpire: () => setCurrentIndex(quiz.length - 1),
  //   });

  // const fetchQuestions = async () => {
  //   axios.get()
  // }

  //   const checkScore = () => {
  //     const questionAnswered = quiz.filter((item) => item.selected);
  //     const questionCorrect = questionAnswered.filter((item) =>
  //       item.options.find(
  //         (option) => option.correct && option.selected === option.correct
  //       )
  //     );
  //     setScore({
  //       correct: questionCorrect.length,
  //       false: quiz.length - questionCorrect.length,
  //     });
  //   };

  useEffect(() => {
    const FetchdetailQuiz = async () => {
      const response = await apiQuiz.detail(auth.data.role, slug);
      // setQuiz(response.data.data.questions);
      const data = response.data.data.questions.map(({ questions }) => {
        // weather is an array of length 1, but still provide fallback
        //   const { title, correct } = options[0] ?? {};
        const { options, question, image } = questions ?? {};
        for (var i = 0; i < currentIndex; i++) {
            questions[i]
            console.log(questions[i]);
        }
        return {
          options,
          question,
          image,
        };
      });

      //   setQuiz(data);
      //   setState(response.data.data.questions);
      console.log(data);
      //   console.log(JSON.stringify(response.data.data.questions));
    };
    // checkScore();
    FetchdetailQuiz();
  }, [auth]);

  const nextQuestion = () => {
    if (quiz.length - 1 === currentIndex) return;
    setCurrentIndex(currentIndex + 1);
  };

  //   const previousQuestion = () => {
  //     if (currentIndex === 0) return;
  //     setCurrentIndex(currentIndex - 1);
  //   };

  //   const selectOption = (indexSelected, indexOptionSelected) => {
  //     quiz.map((item, index) =>
  //       index === indexSelected
  //         ? {
  //             ...item,
  //             selected: true,
  //             options: options.map((item, index) =>
  //               index === indexOptionSelected
  //                 ? { ...item, selected: true }
  //                 : { ...item, selected: false }
  //             ),
  //           }
  //         : item
  //     );
  //   };

  return (
    // <div>
    //   {state.map((item) => {
    //     return (
    //       <div ke={item.id}>
    //         {item.question}
    //         {item.options.map((i) => {
    //           return (
    //             <div key={i.id}>
    //               <br />
    //               <input
    //                 type="radio"
    //                 name={i.title}
    //                 value={i.correct}
    //               />
    //               <label>{i.title}</label>
    //             </div>
    //           );
    //         })}
    //       </div>
    //     );
    //   })}
    // </div>
    <div>tes</div>
    // <div>
    //   <h2 className="text-center mb-3 mt-3">
    //     Quiz Screen - Score: {score.correct} - {score.false} Timer: {hours}:
    //     {minutes}:{seconds}
    //   </h2>
    //   <div className="card mb-3">
    //     <div
    //       className="card-body"
    //       style={{
    //         display: "flex",
    //         padding: 10,
    //         flexWrap: "wrap",
    //       }}
    //     >
    //       {quiz.map((item, index) => (
    //         <div
    //           key={index}
    //           className="border border-primary font-weight-bold"
    //           style={{
    //             display: "flex",
    //             justifyContent: "center",
    //             alignItems: "center",
    //             height: 40,
    //             width: 40,
    //             marginRight: 5,
    //             marginBottom: 5,
    //             borderRadius: 5,
    //             cursor: "pointer",
    //             backgroundColor:
    //               index === currentIndex
    //                 ? "greenyellow "
    //                 : item?.selected
    //                 ? "grey"
    //                 : "transparent",
    //           }}
    //           onClick={() => setCurrentIndex(index)}
    //         >
    //           {index + 1}
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    //   <div className="card">
    //     <div
    //       className="card-header bg-white font-weight-bold"
    //       style={{
    //         fontSize: 20,
    //       }}
    //     >
    //       {currentIndex + 1}. {question}
    //     </div>
    //     <div className="card-body">
    //   {options.map((item, index) => (
    //     <div
    //       style={{
    //         display: "flex",
    //         justifyItems: "center",
    //         alignItems: "center",
    //         color: item?.selected ? "greenyellow" : "grey",
    //         fontSize: 18,
    //       }}
    //       onClick={() => selectOption(currentIndex, index)}
    //       key={index}
    //     >
    //       {/* <div
    //           style={{
    //             height: 20,
    //             width: 20,
    //             borderRadius: 100,
    //             backgroundColor: item?.selected ? "greenyellow" : "grey",
    //             cursor: "pointer",
    //             marginRight: 5,
    //           }}
    //           onClick={() => selectOption(currentIndex, index)}
    //         /> */}
    //       {item.title}
    //     </div>
    //   ))}
    //     </div>
    //   </div>
    //   <div
    //     style={{
    //       display: "flex",
    //       justifyContent: "space-between",
    //       paddingTop: 10,
    //     }}
    //   >
    //     <button
    //       className="btn btn-info col-sm-2"
    //       onClick={() => previousQuestion()}
    //       disabled={currentIndex === 0 ? true : false}
    //     >
    //       Previous
    //     </button>
    //     {quiz.length - 1 === currentIndex ? (
    //       <Link
    //         className="btn btn-success col-sm-2"
    //         to={{
    //           pathname: "/quiz/result",
    //           state: {
    //             score,
    //           },
    //         }}
    //       >
    //         Finish
    //       </Link>
    //     ) : (
    //       <button
    //         className="btn btn-primary col-sm-2"
    //         onClick={() => nextQuestion()}
    //       >
    //         Next
    //       </button>
    //     )}
    //   </div>
    // </div>
  );
};

export default Layout(QuizDetailPage);
