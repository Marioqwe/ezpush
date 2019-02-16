import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import LoginPage from '../components/LoginPage';
import { login } from '../redux/actions';

class LoginPageContainer extends React.Component {
    static propTypes = {
        login: PropTypes.func.isRequired,
    };

    handleSubmit = (data) => {
        const { login } = this.props;
        const { email, password } = data;
        login(email, password);
    };

    render() {
        return  <LoginPage onSubmit={this.handleSubmit} />;
    }
}

const mapDispatchToProps = dispatch => ({
    login: (email, password) => dispatch(login(email, password)),
});

export default connect(
    undefined,
    mapDispatchToProps,
)(LoginPageContainer);
