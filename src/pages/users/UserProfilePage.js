import {
  Avatar,
  Box,
  Chip,
  Divider,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router";
import apiUser from "../../actions/user";
import Layout from "../../components/Layout";

const UserProfilePage = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const classes = useStyles();
  useEffect(() => {
    const fetchDataUser = async () => {
      await apiUser.index(id).then((res) => {
        console.log(res);
        setUser(res.data.data);
      });
    };
    fetchDataUser();
  }, [id]);
  return (
    <Fragment>
      <Paper className={classes.root}>
        <Typography variant="body1">Profile</Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Here is your profile
        </Typography>
        <Divider className={classes.divider} light />
        <Box display="flex" alignItems="center">
          {user.avatar === "" || user.avatar == null ? (
            <AccountCircle className={classes.large} />
          ) : (
            <Avatar
              className={classes.large}
              alt="Profile Icon"
              src={`${window.env.API_URL_ASSETS}/images/avatar/${user.avatar}`}
            />
          )}
          <Box marginLeft={1}>
            <Typography variant="h5" style={{ fontWeight: 700 }}>
              {user.name}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {user.email}
            </Typography>
            {user.role === "siswa" && (
              <Typography
                style={{ margin: "5px 0" }}
                variant="body1"
                color="textSecondary"
              >
                {user.number == null ? (
                  <Chip color="secondary" size="medium" label="Absen kosong" />
                ) : (
                  user.number
                )}
              </Typography>
            )}
          </Box>
        </Box>
      </Paper>
    </Fragment>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
}));

export default Layout(UserProfilePage);
