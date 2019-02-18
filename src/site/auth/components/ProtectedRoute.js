import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({
   component: Component,
   redirectTo,
   condition,
   ...rest
}) => (
    <Route
        {...rest}
        render={(props) => {
            return (
                condition
                    ? <Component {...props} />
                    : <Redirect to={{ pathname: redirectTo }} />
            );
        }}
    />
);

ProtectedRoute.propTypes = {
    component: PropTypes.func.isRequired,
    redirectTo: PropTypes.string.isRequired,
    condition: PropTypes.bool.isRequired,
};

export default ProtectedRoute;
