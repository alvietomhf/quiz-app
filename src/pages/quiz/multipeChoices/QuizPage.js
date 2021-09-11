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
import LoadingProgress from "../../../components/lazyLoad/LoadingProgress";
import { Fragment } from "react";
import moment from "moment";

const QuizPage = () => {
  const [quiz, setQuiz] = useState([]);
  const auth = useSelector((state) => state.auth.data.user);
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  let dateNow = moment().format("YYYY-MM-DD HH:mm");

  const deleteQuiz = async (slug) => {
    const response = await apiQuiz.deleteQuiz(slug);
    const responseQuiz = await apiQuiz.index("quiz");
    const data = responseQuiz.data.data;
    setLoading(false);
    setQuiz(data);
    console.log(response);
  };

  useEffect(() => {
    const fetchDataQuiz = async () => {
      const response = await apiQuiz.index("quiz");
      const data = response.data.data;
      setLoading(false);
      setQuiz(data);
      console.log(data);
    };
    fetchDataQuiz();
  }, [auth]);

  const classes = useStyles();

  return (
    <Container>
      <Grid container className={classes.root} spacing={2}>
        {auth.role === "guru" ? (
          <Button variant="contained" onClick={() => history.push("/quiz/add")}>
            Add Quiz
          </Button>
        ) : (
          ""
        )}
        <Grid item xs={12}>
          {loading ? (
            <LoadingProgress />
          ) : (
            <div style={{ display: "flex" }}>
              {quiz.length === 0
                ? "Quiz not found"
                : quiz
                    .sort((a, b) => (a.title > b.title ? 1 : -1))
                    .map((item) => {
                      return (
                        <Card key={item.id} className={classes.cardQuizList}>
                          <CardContent>
                            <Typography variant="body1">
                              {item.title}
                            </Typography>
                            <Grid container spacing={2}>
                              {auth.role === "guru" ? (
                                <Fragment>
                                  <Button
                                    onClick={() =>
                                      history.push(`/quiz/edit/${item.slug}`, {
                                        slug: item.slug,
                                      })
                                    }
                                    variant="contained"
                                    color="default"
                                  >
                                    Update Quiz
                                  </Button>
                                  <Button
                                    onClick={() => deleteQuiz(item.slug)}
                                    variant="contained"
                                    color="secondary"
                                  >
                                    Delete Quiz
                                  </Button>
                                  <Button
                                    onClick={() =>
                                      history.push(
                                        `/quiz/result/${item.slug}`,
                                        {
                                          slug: item.slug,
                                        }
                                      )
                                    }
                                    variant="contained"
                                    color="default"
                                  >
                                    Lihat Hasil
                                  </Button>
                                </Fragment>
                              ) : auth.role === "siswa" &&
                                dateNow < item.deadline ? (
                                <Button
                                  onClick={() =>
                                    history.push(`/quiz/start/${item.slug}`)
                                  }
                                  variant="contained"
                                  color="primary"
                                >
                                  Start Quiz
                                </Button>
                              ) : (
                                <p style={{ color: "red" }}>
                                  Kuis sudah selesai.
                                </p>
                              )}
                            </Grid>
                          </CardContent>
                        </Card>
                      );
                    })}
            </div>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  cardQuizList: {
    margin: "0 10px",
    width: 250,
  },
}));

export default Layout(QuizPage, "Quiz");
