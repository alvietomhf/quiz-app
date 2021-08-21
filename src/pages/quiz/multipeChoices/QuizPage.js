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

const QuizPage = (props) => {
  const [quiz, setQuiz] = useState([]);
  const auth = useSelector((state) => state.auth);
  const history = useHistory();
  const [loading, setLoading] = useState(true);

  const deleteQuiz = async (slug) => {
    const response = await apiQuiz.deleteQuiz(slug);
    window.location.reload();
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
        {props.auth.data.role === "guru" ? (
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
              {quiz
                .sort((a, b) => (a.title > b.title ? 1 : -1))
                .map((item) => {
                  return (
                    <Card key={item.id} className={classes.cardQuizList}>
                      <CardContent>
                        <Typography variant="body1">{item.title}</Typography>
                        <Grid container spacing={2}>
                          <Button
                            onClick={() =>
                              history.push(`/quiz/start/${item.slug}`)
                            }
                            variant="contained"
                            color="primary"
                          >
                            Start Quiz
                          </Button>
                          {props.auth.data.role === "guru" && (
                            <Button
                              onClick={() => deleteQuiz(item.slug)}
                              variant="contained"
                              color="secondary"
                            >
                              Delete Quiz
                            </Button>
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

export default Layout(QuizPage);
