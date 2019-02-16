import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import { ProtectedRoute } from 'common/containers';
import { LoginPageContainer } from './auth';
import ProtectedPage from './protected';

const Root = () => (
    <React.Fragment>
        <CssBaseline />
        <Router>
            <Switch>
                <Route exact path="/login" component={LoginPageContainer} />
                <ProtectedRoute path="/" component={ProtectedPage} redirectTo="/login" />
            </Switch>
        </Router>
    </React.Fragment>
);

export default Root;
