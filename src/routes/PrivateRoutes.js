import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import Cookies from 'js-cookie'

const PrivateRoutes = ({ component: Component, auth, access, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      auth.isAuthenticated && auth.data.token ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

// export default PrivateRoute;
PrivateRoutes.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoutes);
