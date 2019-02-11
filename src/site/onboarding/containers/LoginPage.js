import React from 'react';

import Login from '../components/Login';

class LoginPage extends React.Component {
    handleSubmit = (event) => {
        event.preventDefault();
        console.log(event);
    };

    render() {
        return  <Login onSubmit={this.handleSubmit} />;
    }
}

export default LoginPage;
