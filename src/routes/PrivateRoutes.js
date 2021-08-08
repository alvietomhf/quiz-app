
import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
// import Cookies from 'js-cookie'

const PrivateRoutes = ({ component: Component, auth, access, ...rest }) => (
    <Route
        {...rest}
        render={(props) =>
            auth.isAuthenticated && access.accessToken ? (
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
    access: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth,
    access: state.access
  });

export default connect(mapStateToProps)(PrivateRoutes);
