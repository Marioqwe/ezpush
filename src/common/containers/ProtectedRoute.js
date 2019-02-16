import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { isAuthenticated } from '../utils';

const ProtectedRoute = ({
   component: Component,
   isLoggedIn,
   redirectTo,
   ...rest
}) => (
    <Route
        {...rest}
        render={(props) => {
            return (
                isLoggedIn
                    ? <Component {...props} />
                    : <Redirect to={{ pathname: redirectTo }} />
            );
        }}
    />
);

ProtectedRoute.propTypes = {
    component: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    redirectTo: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
    isLoggedIn: isAuthenticated(state),
});

export default connect(
    mapStateToProps,
)(ProtectedRoute);
