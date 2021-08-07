import React, { useState, useEffect } from "react";
import { Button, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { CircularProgress } from "@material-ui/core";
import { logOut } from "../../actions/auth/authAction";

const Home = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [logout, setLogout] = useState(false);

  const userLogOut = () => {
    setLogout(true);
    dispatch(logOut);
    setTimeout(() => {
      history.push("/login");
    }, 4000);
  };

  useEffect(() => {
    const abortController = new AbortController();
    return function cleanup() {
      console.log("I am in cleanup function");
      abortController.abort();
    };
  }, []);

  if (!props.auth.isAuthenticated) {
    <Redirect to="/login" />;
  }

  return (
    <div>
      <Typography variant='h4' gutterBottom>Hello, {props.auth.data.name}</Typography>
      {/* <Link to="/journal">Data Journal</Link> */}
      <Button
        style={{ marginTop: 20 }}
        variant="contained"
        disabled={logout ? true : false}
        onClick={userLogOut}
        color="primary"
      >
        {logout ? <CircularProgress size={24} /> : "LOGOUT"}
      </Button>
    </div>
  );
};

Home.propTypes = {
  logOut: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: {},
});

// const drawerWidth = 240;

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: "flex",
//   },
//   appBar: {
//     width: `calc(100% - ${drawerWidth}px)`,
//     marginLeft: drawerWidth,
//     // background: '#388e3c'
//   },
//   drawer: {
//     width: drawerWidth,
//     flexShrink: 0,
//   },
//   drawerPaper: {
//     width: drawerWidth,
//   },
//   // necessary for content to be below app bar
//   toolbar: theme.mixins.toolbar,
//   content: {
//     flexGrow: 1,
//     backgroundColor: theme.palette.background.default,
//     padding: theme.spacing(3),
//   },
// }));


export default connect(mapStateToProps, { logOut })(Home);
