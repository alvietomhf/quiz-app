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

const EssayPage = (props) => {
  const [essay, setEssay] = useState([]);
  const auth = useSelector((state) => state.auth);
  const history = useHistory();

  useEffect(() => {
    const fetchDataQuiz = async () => {
      const response = await apiQuiz.index('essay');
      const data = response.data.data;
      setEssay(data);
      console.log(data);
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
          {essay.map((item) => {
            return (
              <Card key={item.id} className={classes.cardQuizList}>
                <CardContent>
                  <Typography variant="body1">{item.title}</Typography>
                  <Button
                    onClick={() => history.push(`/quiz/dev/${item.slug}`)}
                    variant="contained"
                    color="primary"
                  >
                    Start Essay
                  </Button>
                </CardContent>
              </Card>
            );
          })}
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
    margin: 0,
    width: 250,
  },
}));

export default Layout(EssayPage);
