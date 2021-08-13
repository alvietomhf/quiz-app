import React from "react";
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";

const addQuiz = () => {
  const classes = useStyles();
  return (
    <Grid xs={12} className={classes.root}>
      <Card>
        <CardContent></CardContent>
      </Card>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  rootGrid: {
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column-reverse",
    },
  },
}));

export default addQuiz;
