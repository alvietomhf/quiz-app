import {
  Grid,
  Typography,
  Button,
  Card,
  Container,
  CardContent,
  makeStyles,
} from "@material-ui/core";
import moment from "moment";
import React, { useState, useEffect, Fragment } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import apiQuiz from "../../../actions/quiz/quiz";
import Layout from "../../../components/Layout";
import LoadingProgress from "../../../components/lazyLoad/LoadingProgress";

const EssayPage = () => {
  const [quiz, setQuiz] = useState([]);
  const auth = useSelector((state) => state.auth.data.user);
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  let dateNow = moment().format("YYYY-MM-DD HH:mm");

  const deleteQuiz = async (slug) => {
    const response = await apiQuiz.deleteQuiz(slug);
    const responseQuiz = await apiQuiz.index("essay");
    const data = responseQuiz.data.data;
    setQuiz(data);
    setLoading(false);
    console.log(response);
  };

  useEffect(() => {
    const fetchDataQuiz = async () => {
      const response = await apiQuiz.index("essay");
      const data = response.data.data;
      setQuiz(data);
      setLoading(false);
      console.log(data);
    };
    fetchDataQuiz();
  }, [auth]);

  const classes = useStyles();

  return (
    <Container>
      <Grid container className={classes.root} spacing={2}>
        {auth.role === "guru" ? (
          <Button
            variant="contained"
            onClick={() => history.push("/essay/add")}
          >
            Add Essay
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
                ? "Essay not found"
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
                              {dateNow < item.deadline ? (
                                <Button
                                  onClick={() =>
                                    history.push(`/essay/start/${item.slug}`)
                                  }
                                  variant="contained"
                                  color="primary"
                                >
                                  Start Essay
                                </Button>
                              ) : (
                                <p style={{ color: "red" }}>
                                  Kuis sudah selesai.
                                </p>
                              )}
                              {auth.role === "guru" && (
                                <Fragment>
                                  {/* <Button
                                    onClick={() =>
                                      history.push(`/essay/edit/${item.slug}`, {
                                        slug: item.slug,
                                      })
                                    }
                                    variant="contained"
                                    color="default"
                                  >
                                    Update Essay
                                  </Button> */}
                                  <Button
                                    onClick={() => deleteQuiz(item.slug)}
                                    variant="contained"
                                    color="secondary"
                                  >
                                    Delete Essay
                                  </Button>
                                </Fragment>
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

export default Layout(EssayPage, "Essay");
