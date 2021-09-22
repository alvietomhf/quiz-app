import React, { useEffect, useState } from "react";
import { Avatar, Box, CardHeader, Typography } from "@material-ui/core";
import Layout from "../../../components/Layout";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import UserFeed from "../../../components/UserFeed";
import UserOnline from "../../../components/UserOnline";
import instance from "../../../actions/instance";
import { token } from "../../../config/token";
import PostFeed from "../../../components/PostFeed";
import { useSelector } from "react-redux";
import AccountCircle from "@material-ui/icons/AccountCircle";
import apiFeeds from "../../../actions/feeds/feedsAction";
import { useHistory } from "react-router";
import FeedSkeleton from "../../../components/FeedSkeleton";
import SkeletonUserOnline from "../../../components/SkeletonUserOnline";
import sortByDate from "../../../config/sortByDate";
import moment from "moment";

const Home = () => {
  const auth = useSelector((state) => state.auth.data.user);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const [feeds, setFeeds] = useState([]);

  const goToUserProfile = (id) => {
    history.push({ pathname: `/users/${id}` });
  };

  useEffect(() => {
    const fetchFeeds = async () => {
      const response = await apiFeeds.indexFeed();
      const data = response.data.data;
      setFeeds(data);
      setLoading(false);
      console.log(data);
    };
    const fetchUser = async () => {
      instance
        .get("api/users/status", {
          headers: {
            Authorization: "Bearer " + token(),
          },
        })
        .then((response) => {
          setOnlineUsers(response.data.data);
          setLoading(false);
        });
    };
    fetchFeeds();
    fetchUser();
  }, [auth]);

  const classes = useStyles();
  return (
    <div>
      <Grid container spacing={2} className={classes.rootGrid}>
        <Grid item xs={12} lg={3} className={classes.gridItem}>
          <Paper className={classes.userPaper}>
            <Box>
              <CardHeader
                style={{ padding: 5 }}
                avatar={
                  auth.avatar ? (
                    <Avatar
                      src={`http://192.168.0.8:8000/assets/images/avatar/${auth.avatar}`}
                      aria-label="recipe"
                      className={classes.avatar}
                    />
                  ) : (
                    <AccountCircle />
                  )
                }
                title={
                  <Typography
                    variant="body1"
                    style={{ fontSize: 20, margin: 0 }}
                  >
                    {auth.name}
                    <br />
                  </Typography>
                }
                subheader={
                  <Typography
                    variant="subtitle1"
                    style={{ fontSize: 12, margin: 0 }}
                    gutterBottom
                  >
                    {auth.email}
                  </Typography>
                }
              />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} lg={5} className={classes.gridItem}>
          <Paper
            style={{ minHeight: 180, overflow: "hidden" }}
            className={classes.userInputFeed}
          >
            <Grid container>
              <Grid item xs={12} style={{ width: "100%" }}>
                <PostFeed setFeeds={setFeeds} />
              </Grid>
            </Grid>
          </Paper>
          {loading ? (
            <FeedSkeleton />
          ) : (
            feeds.sort(sortByDate).map((item) => {
              return (
                <UserFeed
                  key={item.id}
                  id={item.id}
                  name={item.user.name}
                  dateCreated={item.created_at}
                  image={item.image}
                  setFeeds={setFeeds}
                  caption={item.message}
                  comments={item.replies}
                  userID={item.user.id}
                />
              );
            })
          )}
        </Grid>
        <Grid item xs={12} lg={4} className={classes.gridItem}>
          <Paper className={classes.userOnlinePaper}>
            <div>
              <Typography variant="h6" gutterBottom>
                <b>User Online</b>
              </Typography>
              {loading ? (
                <div>
                  <SkeletonUserOnline />
                  <SkeletonUserOnline />
                </div>
              ) : (
                onlineUsers.slice(0, 3).map((user) => {
                  return (
                    <UserOnline
                      key={user.id}
                      name={user.name}
                      lastSeen={moment(user.last_seen).fromNow()}
                      avatar={user.avatar}
                      goToUserProfile={() => goToUserProfile(user.id)}
                    />
                  );
                })
              )}
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {},
  gridItem: {
    [theme.breakpoints.up("lg")]: {
      margin: 0,
    },
  },
  rootGrid: {
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column-reverse",
    },
  },
  userDetailInputFeed: {
    margin: "20px auto",
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
    padding: 15,
    [theme.breakpoints.down("sm")]: {
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

export default Layout(Home, "Home");
