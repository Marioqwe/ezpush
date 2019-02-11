import React from 'react'
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { ProtectedRoute } from 'common/containers';
import { LoginPage } from './onboarding';
import ProtectedPage from './protected';

const Root = ({ store }) => (
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path="/login" component={LoginPage} />
                <ProtectedRoute path='/' component={ProtectedPage} />
            </Switch>
        </Router>
    </Provider>
);

export default Root;
