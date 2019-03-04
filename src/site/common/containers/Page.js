import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { setCurrentUrl } from 'common/redux/actions';

class Page extends React.Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
        currentUrl: PropTypes.string,
        location: PropTypes.string.isRequired,
        redirectTo: PropTypes.string,
        setCurrentUrl: PropTypes.func.isRequired,
        title: PropTypes.string.isRequired,
    };

    static defaultProps = {
        currentUrl: undefined,
        redirectTo: undefined,
    };

    constructor(props) {
        super(props);
        this._isMounted = false;
    }

    componentDidMount() {
        this._isMounted = true;
        const { location, setCurrentUrl, title } = this.props;
        document.title = title;
        setCurrentUrl(location);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const { children, redirectTo } = this.props;
        if (redirectTo !== undefined) return <Redirect to={redirectTo} />;
        if (!this._isMounted) return null;
        return (
            <React.Fragment>
                {children}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    currentUrl: state.common.currentUrl,
    redirectTo: state.common.redirectTo,
});

const mapDispatchToProps = dispatch => ({
    setCurrentUrl: url => dispatch(setCurrentUrl(url)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Page);
