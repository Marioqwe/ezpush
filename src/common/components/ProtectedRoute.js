import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({
   component: Component,
   isLoggedIn,
   redirectTo,
   flag,
   ...rest
}) => (
    <Route
        {...rest}
        render={(props) => {
            return (
                flag
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
    flag: PropTypes.bool.isRequired,
};

export default ProtectedRoute;
