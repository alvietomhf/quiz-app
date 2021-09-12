import { Card, CardHeader, makeStyles } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React from "react";

const useStyles = makeStyles((theme) => ({
  card: {
    minWidth: 345,
    boxShadow: "none",
  },
  media: {
    height: 290,
  },
}));

const SkeletonUserOnline = () => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Skeleton animation="wave" variant="circle" width={40} height={40} />
        }
        title={
          <Skeleton
            animation="wave"
            height={10}
            width="80%"
            style={{ marginBottom: 6 }}
          />
        }
        subheader={<Skeleton animation="wave" height={10} width="40%" />}
      />
    </Card>
  );
};

export default SkeletonUserOnline;
