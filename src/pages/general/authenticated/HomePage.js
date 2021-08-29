import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  CardHeader,
  TextareaAutosize,
  Typography,
} from "@material-ui/core";
import Layout from "../../../components/Layout";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import UserFeed from "../../../components/UserFeed";
import UserOnline from "../../../components/UserOnline";
// import apiFeeds from "../../../actions/feeds/feedsAction";
import instance from "../../../actions/instance";
import { token } from "../../../config/token";
import PostFeed from "../../../components/PostFeed";
import { Form, Formik } from "formik";

const Home = (props) => {
  const userOnline = [
    {
      id: 1,
      name: "Dr.Hendrawan, S.Pd",
      email: "hendrawanspd@gmail.com",
      caption:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus fermentum venenatis pulvinar. Proin vitae lectus urna. Sed erat ipsum, maximus a elit nec, condimentum placerat ex. Ut tincidunt mi eget condimentum mollis. Pellentesque aliquam velit quis est varius, sed molestie dolor ultrices. Pellentesque eget dapibus eros, at blandit arcu. Duis id purus quis mi porttitor viverra vel tempus elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos posuere",
    },
    {
      id: 2,
      name: "Dr.Dwiki Yosafat, S.Pd",
      email: "hendrawanspd@gmail.com",
      caption:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus fermentum venenatis pulvinar. Proin vitae lectus urna. Sed erat ipsum, maximus a elit nec, condimentum placerat ex. Ut tincidunt mi eget condimentum mollis. Pellentesque aliquam velit quis est varius, sed molestie dolor ultrices. Pellentesque eget dapibus eros, at blandit arcu. Duis id purus quis mi porttitor viverra vel tempus elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos posuere",
    },
    {
      id: 3,
      name: "Dr.Heri Purwanto, S.Pd",
      email: "hendrawanspd@gmail.com",
      caption:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus fermentum venenatis pulvinar. Proin vitae lectus urna. Sed erat ipsum, maximus a elit nec, condimentum placerat ex. Ut tincidunt mi eget condimentum mollis. Pellentesque aliquam velit quis est varius, sed molestie dolor ultrices. Pellentesque eget dapibus eros, at blandit arcu. Duis id purus quis mi porttitor viverra vel tempus elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos posuere",
    },
  ];

  const [feeds, setFeeds] = useState([]);

  useEffect(() => {
    const fetchFeeds = async () => {
      instance
        .get("/api/feeds", {
          headers: {
            Authorization: "Bearer " + token(),
          },
        })
        .then((response) => {
          const data = response.data.data;
          setFeeds(data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchFeeds();
    setInterval(() => {
      fetchFeeds();
    }, 10000);
  }, []);

  const classes = useStyles();
  return (
    <div>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid
            container
            className={classes.rootGrid}
            justifyContent="center"
            spacing={2}
          >
            <Grid item>
              <Paper className={classes.userPaper}>
                <Box>
                  <CardHeader
                    style={{ padding: 5 }}
                    avatar={
                      <Avatar
                        src={`http://192.168.0.9:8000/assets/images/avatar/${props.auth.data.avatar}`}
                        aria-label="recipe"
                        className={classes.avatar}
                      />
                    }
                    title={
                      <Typography
                        variant="body1"
                        style={{ fontSize: 20, margin: 0 }}
                      >
                        {props.auth.data.name}
                        <br />
                      </Typography>
                    }
                    subheader={
                      <Typography
                        variant="subtitle1"
                        style={{ fontSize: 12, margin: 0 }}
                        gutterBottom
                      >
                        {props.auth.data.email}
                      </Typography>
                    }
                  />
                </Box>
              </Paper>
            </Grid>
            <Grid item className={classes.userGridInput}>
              <Paper
                style={{ minHeight: 180, overflow: "hidden" }}
                className={classes.userInputFeed}
              >
                <Grid container>
                  <Grid
                    item
                    xs={12}
                    className={classes.userDetailInputFeed}
                    lg={1}
                  >
                    <CardHeader
                      style={{ padding: 5 }}
                      avatar={
                        <Avatar
                          src="https://i.imgur.com/iJq78XH.jpg"
                          aria-label="recipe"
                          className={classes.avatarFeed}
                        />
                      }
                      title={
                        <Typography
                          variant="body1"
                          style={{ fontSize: 20, margin: 0 }}
                          className={classes.textAreaUserDetail}
                          gutterBottom
                        >
                          Yeremia Alfa {props.auth.data.name}
                          <br />
                        </Typography>
                      }
                      subheader={
                        <Typography
                          variant="subtitle1"
                          style={{ fontSize: 12, margin: 0 }}
                          gutterBottom
                          className={classes.textAreaUserDetail}
                        >
                          raikkonen{props.auth.data.email}
                        </Typography>
                      }
                    />
                  </Grid>
                  <Grid item xs={12} style={{ width: "100%" }}>
                    <PostFeed />
                  </Grid>
                </Grid>
              </Paper>
              {feeds.map((feed) => {
                return (
                  <UserFeed
                    key={feed.id}
                    name={feed.user.name}
                    image={feed.image}
                    caption={feed.message}
                  />
                );
              })}
              {/* {feeds.sort((a, b) => {
                const dateA = new Date(a.created_at);
                const dateB = new Date(b.created_at);
                return dateA - dateB;
              })} */}
            </Grid>
            <Grid item className={classes.gridUserOnline}>
              <Paper className={classes.userOnlinePaper}>
                <Typography variant="h6" gutterBottom>
                  <b>User Online</b>
                </Typography>
                {userOnline.map((user) => {
                  return (
                    <UserOnline
                      key={user.id}
                      name={user.name}
                      email={user.email}
                    />
                  );
                })}
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
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
  userDetailInputFeed: {
    margin: "15px auto",
    [theme.breakpoints.up("lg")]: {
      display: "none",
      margin: 15,
    },
  },
  userGridInput: {
    width: 560,
    [theme.breakpoints.between("sm", "md")]: {
      width: "100%",
    },
  },
  userPaper: {
    width: 260,
    padding: 10,
    position: "sticky",
    alignSelf: "flex-start",
    top: 80,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      display: "none",
      width: "100%",
    },
    [theme.breakpoints.between("sm", "md")]: {
      width: "100%",
      display: "none",
    },
  },
  userOnlinePaper: {
    height: "auto",
    position: "sticky",
    alignSelf: "flex-start",
    top: 80,
    overflowY: "auto",
    padding: 10,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  gridUserOnline: {
    flexDirection: "column-reverse",
    width: 330,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    [theme.breakpoints.between("sm", "md")]: {
      width: "100%",
    },
  },
  userInputFeed: {
    minHeight: 260,
    [theme.breakpoints.up("lg")]: {
      minHeight: 100,
    },
    padding: 20,
    marginBottom: 20,
  },
  userFeed: {
    padding: 20,
    marginBottom: 20,
  },
  media: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    boxShadow: "none",
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default Layout(Home);
