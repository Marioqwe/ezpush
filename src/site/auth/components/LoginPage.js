import React from 'react';
import PropTypes from 'prop-types';

import { HTTPComponent } from 'lib/api-middleware/http-component/index';
import Page from 'common/containers/Page';
import LoginForm from './LoginForm';
import { login } from '../redux/actions';

const LoginPage = ({ match }) => (
    <Page title="Login" location={match.url}>
        <HTTPComponent
            uid="LoginForm"
            component={LoginForm}
            request={{ login }}
        />
    </Page>
);

LoginPage.propTypes = {
    match: PropTypes.shape({
        url: PropTypes.string.isRequired,
    }).isRequired,
};

export default LoginPage;
