import {
  Grid,
  Typography,
  Button,
  Card,
  Container,
  CardContent,
  makeStyles,
  Box,
  CardMedia,
} from "@material-ui/core";
import moment from "moment";
import React, { useState, useEffect, Fragment } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import apiQuiz from "../../../actions/quiz/quiz";
import EmptyDataComponent from "../../../components/EmptyData";
import Layout from "../../../components/Layout";
import LoadingProgress from "../../../components/lazyLoad/LoadingProgress";
import AddEssayComponent from "./AddEssayComponent";

const EssayPage = () => {
  const [quiz, setQuiz] = useState([]);
  const auth = useSelector((state) => state.auth.data.user);
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  let dateNow = moment().format("YYYY-MM-DD HH:mm");
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
      <AddEssayComponent open={open} handleClose={handleClose} />
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          {loading ? (
            <LoadingProgress />
          ) : (
            <div>
              {quiz.length === 0 ? (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "80vh",
                  }}
                >
                  <EmptyDataComponent label="Esai" />
                  {auth.role === "guru" ? (
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={handleClickOpen}
                    >
                      Add Essay
                    </Button>
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                quiz
                  .sort((a, b) => (a.title > b.title ? 1 : -1))
                  .map((item) => {
                    return (
                      <Grid
                        item
                        xs={12}
                        className={classes.cardQuizList}
                        lg={4}
                        key={item.id}
                      >
                        <Card>
                          {item.banner !== null ? (
                            <CardMedia
                              component="img"
                              height="240"
                              loading="lazy"
                              image={`http://192.168.0.8:8000/assets/images/quiz/${item.banner}`}
                              alt=""
                            />
                          ) : (
                            <CardMedia
                              component="img"
                              height="240"
                              loading="lazy"
                              image={`https://source.unsplash.com/1600x900/?students,teacher`}
                              alt=""
                            />
                          )}
                          <CardContent>
                            <div
                              style={{
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis",
                                width: 280,
                                overflow: "hidden",
                              }}
                            >
                              <Typography
                                variant="inherit"
                                style={{ fontWeight: 700 }}
                                color="textPrimary"
                              >
                                {item.title}
                              </Typography>
                            </div>
                            <Typography variant="body2" color="textSecondary">
                              Deadline: {item.deadline}
                            </Typography>
                            <Grid container spacing={1}>
                              {auth.role === "guru" ? (
                                <Fragment>
                                  <Box marginTop={2} marginLeft={`auto`}>
                                    <Button
                                      onClick={() =>
                                        history.push(
                                          `/essay/edit/${item.slug}`,
                                          {
                                            slug: item.slug,
                                          }
                                        )
                                      }
                                      color="primary"
                                    >
                                      Update
                                    </Button>
                                    <Button
                                      onClick={() => deleteQuiz(item.slug)}
                                      color="secondary"
                                    >
                                      Delete
                                    </Button>
                                    <Button
                                      onClick={() =>
                                        history.push(
                                          `/essay/result/${item.slug}`,
                                          {
                                            slug: item.slug,
                                          }
                                        )
                                      }
                                      color="default"
                                    >
                                      Lihat Hasil
                                    </Button>
                                  </Box>
                                </Fragment>
                              ) : auth.role === "siswa" &&
                                dateNow < item.deadline ? (
                                <Box marginTop={2}>
                                  <Button
                                    onClick={() =>
                                      history.push(`/essay/start/${item.slug}`)
                                    }
                                    variant="contained"
                                    color="primary"
                                  >
                                    Start Quiz
                                  </Button>
                                </Box>
                              ) : (
                                <Box marginTop={2} marginLeft={`auto`}>
                                  {" "}
                                  <p style={{ color: "red" }}>
                                    Kuis sudah selesai.
                                  </p>
                                </Box>
                              )}
                            </Grid>
                          </CardContent>
                        </Card>
                      </Grid>
                    );
                  })
              )}
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
    width: "fit-content",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
}));

export default Layout(EssayPage, "Essay");
