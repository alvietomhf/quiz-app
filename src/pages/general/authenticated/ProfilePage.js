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
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import Layout from "../../../components/Layout";

const ProfilePage = () => {
  const auth = useSelector((state) => state.auth.data.user);
  console.log(auth);
  const classes = useStyles();
  return (
    <Fragment>
      <Paper className={classes.root}>
        <Typography variant="body1">Profile</Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Here is your profile
        </Typography>
        <Divider className={classes.divider} light />
        <Box display="flex" alignItems="center">
          {auth.avatar === "" || auth.avatar == null ? (
            <AccountCircle className={classes.large} />
          ) : (
            <Avatar
              className={classes.large}
              alt="Profile Icon"
              src={`http://13.212.71.204:8000/assets/images/avatar/${auth.avatar}`}
            />
          )}
          <Box marginLeft={1}>
            <Typography variant="h5" style={{ fontWeight: 700 }}>
              {auth.name}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {auth.email}
            </Typography>
            {auth.role === "siswa" && (
              <Typography
                style={{ margin: "5px 0" }}
                variant="body1"
                color="textSecondary"
              >
                {auth.number == null ? (
                  <Chip color="secondary" size="medium" label="Absen kosong" />
                ) : (
                  auth.number
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

export default Layout(ProfilePage, "Halaman Profil");
