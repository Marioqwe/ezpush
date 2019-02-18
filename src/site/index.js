import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import ProtectedRoute from 'auth/components/ProtectedRoute';
import { isAuthenticated } from 'auth/redux/utils';
import { LoginPageContainer } from './auth';
import ProtectedPage from './protected';

const Root = ({ isLoggedIn }) => (
    <React.Fragment>
        <CssBaseline />
        <Router>
            <Switch>
                <Route exact path="/login" component={LoginPageContainer} />
                <ProtectedRoute
                    path="/"
                    component={ProtectedPage}
                    redirectTo="/login"
                    condition={isLoggedIn}
                />
            </Switch>
        </Router>
    </React.Fragment>
);

Root.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
    isLoggedIn: isAuthenticated(state),
});

export default connect(
    mapStateToProps,
)(Root);
