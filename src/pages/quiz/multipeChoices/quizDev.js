import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Layout from "../../../components/Layout";
import apiQuiz from "../../../actions/quiz/quiz";
import { useSelector } from "react-redux";
import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
// import axios from "axios";

const QuizDev = (props) => {
  const [quiz, setQuiz] = useState([]);
  const auth = useSelector((state) => state.auth);
  const history = useHistory();

  useEffect(() => {
    const fetchDataQuiz = async () => {
      const response = await apiQuiz.index('quiz');
      const data = response.data.data;
      setQuiz(data);
      console.log(data);
      // data.quesit
    };
    fetchDataQuiz();
  }, [auth]);

  const classes = useStyles();

  return (
    <Container>
      <Grid container className={classes.root} spacing={2}>
        {props.auth.data.role === "guru" ? (
          <Button variant="contained" onClick={() => history.push('/quiz/dev/add')}>Add Quiz</Button>
        ) :
          ""
        }
        <Grid item xs={12}>
          {quiz.map((item) => {
            return (
              <Card key={item.id} className={classes.cardQuizList}>
                <CardContent>
                  <Typography variant="body1">{item.title}</Typography>
                  <Button
                    onClick={() => history.push(`/quiz/dev/${item.slug}`)}
                    variant="contained"
                    color="primary"
                  >
                    Start Quiz
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </Grid>
      </Grid>
    </Container>
  );

  // const [score, setScore] = useState({
  //   correct: 0,
  //   false: 0,
  // });
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  cardQuizList: {
    margin: 0,
    width: 250,
  },
}));

//   const { question, options } = quiz[currentIndex];

//   const MINUTES = 120 * 60;
//   const time = new Date();
//   time.setSeconds(time.getSeconds() + MINUTES);

//   const { seconds, minutes, hours } = useTimer({
//     expiryTimestamp: time,
//     onExpire: () => setCurrentIndex(quiz.length - 1),
//   });

//   // const fetchQuestions = async () => {
//   //   axios.get()
//   // }

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

//   useEffect(() => {
//     fetchQuestions()
//     checkScore();
//     // fetchQuestions();
//   });

//   const nextQuestion = () => {
//     if (quiz.length - 1 === currentIndex) return;
//     setCurrentIndex(currentIndex + 1);
//   };

//   const previousQuestion = () => {
//     if (currentIndex === 0) return;
//     setCurrentIndex(currentIndex - 1);
//   };

//   const selectOption = (indexSelected, indexOptionSelected) => {
//     setQuiz(
//       quiz.map((item, index) =>
//         index === indexSelected
//           ? {
//               ...item,
//               selected: true,
//               options: options.map((item, index) =>
//                 index === indexOptionSelected
//                   ? { ...item, selected: true }
//                   : { ...item, selected: false }
//               ),
//             }
//           : item
//       )
//     );
//   };

//   return (
//     <div>
//       <h2 className="text-center mb-3 mt-3">
//         Quiz Screen - Score: {score.correct} - {score.false} Timer: {hours}:
//         {minutes}:{seconds}
//       </h2>
//       <div className="card mb-3">
//         <div
//           className="card-body"
//           style={{
//             display: "flex",
//             padding: 10,
//             flexWrap: "wrap",
//           }}
//         >
//           {quiz.map((item, index) => (
//             <div
//               key={index}
//               className="border border-primary font-weight-bold"
//               style={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 height: 40,
//                 width: 40,
//                 marginRight: 5,
//                 marginBottom: 5,
//                 borderRadius: 5,
//                 cursor: "pointer",
//                 backgroundColor:
//                   index === currentIndex
//                     ? "greenyellow "
//                     : item?.selected
//                     ? "grey"
//                     : "transparent",
//               }}
//               onClick={() => setCurrentIndex(index)}
//             >
//               {index + 1}
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="card">
//         <div
//           className="card-header bg-white font-weight-bold"
//           style={{
//             fontSize: 20,
//           }}
//         >
//           {currentIndex + 1}. {question}
//         </div>
//         <div className="card-body">
//           {options.map((item, index) => (
//             <div
//               style={{
//                 display: "flex",
//                 justifyItems: "center",
//                 alignItems: "center",
//                 color: item?.selected ? "greenyellow" : "grey",
//                 fontSize: 18,
//               }}
//               onClick={() => selectOption(currentIndex, index)}
//               key={index}
//             >
//               {/* <div
//                 style={{
//                   height: 20,
//                   width: 20,
//                   borderRadius: 100,
//                   backgroundColor: item?.selected ? "greenyellow" : "grey",
//                   cursor: "pointer",
//                   marginRight: 5,
//                 }}
//                 onClick={() => selectOption(currentIndex, index)}
//               /> */}
//               {item.title}
//             </div>
//           ))}
//         </div>
//       </div>
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           paddingTop: 10,
//         }}
//       >
//         <button
//           className="btn btn-info col-sm-2"
//           onClick={() => previousQuestion()}
//           disabled={currentIndex === 0 ? true : false}
//         >
//           Previous
//         </button>
//         {quiz.length - 1 === currentIndex ? (
//           <Link
//             className="btn btn-success col-sm-2"
//             to={{
//               pathname: "/quiz/result",
//               state: {
//                 score,
//               },
//             }}
//           >
//             Finish
//           </Link>
//         ) : (
//           <button
//             className="btn btn-primary col-sm-2"
//             onClick={() => nextQuestion()}
//           >
//             Next
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

export default Layout(QuizDev);
