import {
  Avatar,
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { Fragment, useEffect, useState } from "react";
import { Redirect, useParams } from "react-router";
import instance from "../../../actions/instance";
import Layout from "../../../components/Layout";
import { token } from "../../../config/token";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import AccessAlarmIcon from "@material-ui/icons/AccessAlarm";
import { Field, Form, Formik } from "formik";
import { buildFormData } from "../../../components/BuildFormData";
import { Send } from "@material-ui/icons";
import apiQuiz from "../../../actions/quiz/quiz";
import ResultQuizIndicator from "../../../components/ResultIndicator";
import { Alert } from "@material-ui/lab";

const DetailEssay = () => {
  const slug = useParams();
  const [data, setData] = useState([{}]);
  const [error, setError] = useState("");
  const [questions, setQuestions] = useState([{}]);
  const [open, setOpen] = useState(false);
  const initialValues = {
    file: "",
    comment: "",
  };
  useEffect(() => {
    const getEssayDetail = async () => {
      instance
        .get(`/api/quizzes/${slug.slug}`, {
          headers: {
            Authorization: "Bearer " + token(),
          },
        })
        .then((response) => {
          const res = response.data.data;
          setData(res);
          setQuestions(res.questions[0]);
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getEssayDetail();
  }, [slug]);

  const classes = useStyles();

  const jsonToFormData = (data) => {
    const formData = new FormData();
    formData.append("question_id", questions.id);
    buildFormData(formData, data);
    return formData;
  };

  const onSubmit = async (values) => {
    const formData = jsonToFormData(values);
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    await apiQuiz
      .siswaSubmitEssay(formData, slug.slug)
      .then(() => {
        setOpen(true);
        setTimeout(() => {
          setOpen(false);
          <Redirect to="essay" />;
        }, 2000);
      })
      .catch((err) => {
        setError(err.response.data.message);
        setTimeout(() => {
          setOpen(false);
          setError("");
        }, 2000);
      });
  };
  return (
    <Fragment>
      <div>
        <ResultQuizIndicator open={open} setOpen={setOpen} />
      </div>
      <Grid container spacing={2} className={classes.root}>
        <Grid item xs={12} lg={9}>
          <Formik onSubmit={onSubmit} initialValues={initialValues}>
            {({
              values,
              errors,
              touched,
              isSubmitting,
              resetForm,
              setFieldValue,
            }) => (
              <Form>
                <Paper className={classes.paper}>
                  <Box>
                    <Typography
                      variant="h4"
                      gutterBottom
                      className={classes.questionText}
                    >
                      {questions.question}
                    </Typography>
                    {error && (
                      <Alert variant="standard" severity={"error"}>
                        {error}
                      </Alert>
                    )}
                    <Box marginY={2}>
                      <Fragment>
                        <Typography variant="body1" gutterBottom>
                          Unggah tugas anda.
                        </Typography>
                        <div
                          style={{
                            margin: "5px 0",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Button
                            variant="outlined"
                            component="label"
                            style={{
                              marginRight: 10,
                            }}
                            startIcon={<AttachFileIcon />}
                          >
                            Upload Dokumen
                            <input
                              type="file"
                              name="file"
                              hidden
                              onChange={(event) =>
                                setFieldValue(
                                  "file",
                                  event.currentTarget.files[0]
                                )
                              }
                            />
                          </Button>
                          {values.file ? (
                            <div>
                              {`File Found`}
                              <Button
                                color="secondary"
                                style={{
                                  cursor: "pointer",
                                  marginLeft: 5,
                                }}
                                onClick={() => setFieldValue("", "file")}
                              >
                                Remove
                              </Button>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                        <Box marginY={2} display="flex" flexDirection="column">
                          <Typography variant="body1" gutterBottom>
                            Komentar
                          </Typography>
                          <Field
                            as={TextField}
                            multiline
                            fullWidth
                            rows={4}
                            placeholder="Berikan komentar anda"
                            name="comment"
                            variant="outlined"
                          />
                        </Box>
                      </Fragment>
                    </Box>
                  </Box>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "end",
                    }}
                  >
                    <Button color="secondary" onClick={() => resetForm()}>
                      Reset
                    </Button>
                    <Button
                      type="submit"
                      color="primary"
                      variant="contained"
                      endIcon={<Send />}
                    >
                      Submit
                    </Button>
                  </div>
                </Paper>
              </Form>
            )}
          </Formik>
        </Grid>
        <Grid item xs={12} lg={3}>
          <Paper>
            <List className={classes.root}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar style={{ background: "#388e3c" }}>
                    <AccessAlarmIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography
                      variant="body1"
                      style={{ fontWeight: 700, margin: 0 }}
                      gutterBottom
                    >
                      Tanggal Pengumpulan
                    </Typography>
                  }
                  secondary={data.deadline}
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column-reverse",
    },
  },
  paper: {
    padding: 15,
  },
  boxHead: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      width: "100%",
      alignItems: "start",
    },
    alignItems: "center",
  },

  questionText: {
    marginTop: 5,
    fontWeight: 700,
  },
  cardQuizList: {
    width: "fit-content",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
}));

export default Layout(DetailEssay, "Esai");
