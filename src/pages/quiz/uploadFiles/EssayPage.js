import {
  Grid,
  Typography,
  Button,
  Card,
  Container,
  CardContent,
  makeStyles,
} from "@material-ui/core";
import React, { useState, useEffect, Fragment } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import apiQuiz from "../../../actions/quiz/quiz";
import Layout from "../../../components/Layout";
import LoadingProgress from "../../../components/lazyLoad/LoadingProgress";

const EssayPage = (props) => {
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
        {props.auth.data.role === "guru" ? (
          <Button variant="contained" onClick={() => history.push("/essay/add")}>
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
                              history.push(`/essay/start/${item.slug}`)
                            }
                            variant="contained"
                            color="primary"
                          >
                            Start Essay
                          </Button>
                          {props.auth.data.role === "guru" && (
                            <Fragment>
                              <Button
                                onClick={() =>
                                  history.push(`/essay/edit/${item.slug}`, {
                                    slug: item.slug,
                                  })
                                }
                                variant="contained"
                                color="default"
                              >
                                Update Essay
                              </Button>
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

export default Layout(EssayPage);
