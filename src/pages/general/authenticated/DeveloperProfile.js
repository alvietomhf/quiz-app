import { Avatar, Box, makeStyles, Paper, Typography } from "@material-ui/core";
import React from "react";
import Layout from "../../../components/Layout";
import ProfileAvatar from "../../../assets/images/profileAvatar.webp";
import SchoolIcon from "@material-ui/icons/School";
import PlaceIcon from "@material-ui/icons/Place";
import EmailIcon from "@material-ui/icons/Email";

const DeveloperProfile = () => {
  const classes = useStyles();
  return (
    <div>
      <Paper
        style={{
          padding: "40px 10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Avatar src={ProfileAvatar} className={classes.large} />
        <Typography variant="h5" style={{ fontWeight: 700, marginTop: 15 }}>
          Dwiky Yosafat
        </Typography>
        <Box display="flex" alignItems="center" marginTop={2}>
          <SchoolIcon style={{ marginRight: 10 }} />
          <Typography variant="body1">Universitas Negeri Surabaya</Typography>
        </Box>
        <Box display="flex" marginTop={1}>
          <PlaceIcon style={{ marginRight: 10 }} />
          <Typography variant="body1">Nganjuk, 21 Juni 1999</Typography>
        </Box>
        <Box display="flex" marginTop={1}>
          <EmailIcon style={{ marginRight: 10 }} />
          <Typography variant="body1">dwikyyosafat55@gmail.com</Typography>
        </Box>
      </Paper>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(27),
    height: theme.spacing(27),
  },
}));

export default Layout(DeveloperProfile);
