import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { isAuthenticated } from 'common/redux/utils';

const ProtectedRoute = ({
   component: Component,
   isLoggedIn,
   ...rest
}) => (
    <Route
        {...rest}
        render={(props) => {
            return (
                isLoggedIn
                    ? <Component {...props} />
                    : <Redirect to={{ pathname: '/login' }} />
            );
        }}
    />
);

ProtectedRoute.propTypes = {
    component: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
    isLoggedIn: isAuthenticated(state),
});

export default connect(
    mapStateToProps,
)(ProtectedRoute);
