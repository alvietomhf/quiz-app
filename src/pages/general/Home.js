import React, { useState } from "react";
import { Button } from "@material-ui/core";
import PropTypes from "prop-types";
import { Redirect, useHistory, Link } from "react-router-dom";
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

  if (!props.auth.isAuthenticated) {
    <Redirect to="/login" />;
  }

  return (
    <div>
      <h2>Hello, {props.auth.data.name}</h2>
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

export default connect(mapStateToProps, { logOut })(Home);
