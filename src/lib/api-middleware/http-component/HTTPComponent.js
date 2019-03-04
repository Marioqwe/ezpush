import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setHttpComponent } from './actions';
import { CALL_API } from '../middleware';

class HTTPComponent extends React.Component {
    static propTypes = {
        httpComponent: PropTypes.shape({
            uid: PropTypes.string,
            errors: PropTypes.shape({}),
            isWaiting: PropTypes.bool,
            completed: PropTypes.bool,
        }).isRequired,
        uid: PropTypes.string.isRequired,
        component: PropTypes.func,
        render: PropTypes.func,
        setHttpComponent: PropTypes.func,
        stateProps: PropTypes.func,
        dispatchProps: PropTypes.func,
        request: PropTypes.shape({}),
    };

    static defaultProps = {
        httpComponent: {},
    };

    constructor(props) {
        super(props);
        this._isMounted = false;
    }

    componentDidMount() {
        this._isMounted = true;
        const { setHttpComponent, uid } = this.props;
        setHttpComponent(uid);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        if (!this._isMounted) return null;
        const {
            component,
            render,
            uid,
            httpComponent,
            setHttpComponent,
            request,
            ...rest
        } = this.props;
        let props = {
            isWaiting: false,
            completed: false,
            errors: {},
            uid,
            ...rest,
        };
        if (httpComponent !== undefined) props = { ...props, ...httpComponent };
        return component
            ? React.createElement(component, props)
            : render(props);
    }
}



const mapStateToProps = (state, ownProps) => {
    const { stateProps = () => {} }  = ownProps;
    return {
        ...stateProps(state),
        httpComponent: state.httpComponent[ownProps.uid],
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    const { dispatchProps = {}, request } = ownProps;
    let props = { ...dispatchProps };

    // only one request allowed at this time.
    if (request !== undefined
        && Object.keys(request).length === 1) {
        const key = Object.keys(request)[0];
        props = {
            ...props,
            [key]: (...args) => {
                const value = request[key](...args);
                const callApi = value[CALL_API];
                if (callApi === undefined) {
                    throw new Error();
                }

                if (callApi.actions === undefined
                    || callApi.actions.length !== 3) {
                    return dispatch(value);
                }

                const newActions = [];
                for (let i = 0; i < callApi.actions.length; i++) {
                    let action = callApi.actions[i];
                    if (typeof action === 'string') {
                        action = {type: action};
                    } else if (typeof action !== 'object') {
                        // It's not our job to raise an error here.
                        // Let the api-middleware do that.
                        return dispatch(value);
                    }

                    if (i === 0) { // request
                        newActions.push({
                            ...action,
                            httpComponentPayload: {
                                isWaiting: true,
                                uid: ownProps.uid,
                                completed: false,
                                errors: {},
                            },
                        });
                    } else if (i === 1) { // success
                        newActions.push({
                            ...action,
                            httpComponentPayload: {
                                isWaiting: false,
                                uid: ownProps.uid,
                                completed: true,
                                errors: {},
                            },
                        });
                    } else {
                        newActions.push({
                            ...action,
                            httpComponentPayload: {
                                isWaiting: false,
                                uid: ownProps.uid,
                                completed: false,
                                errors: {},
                            },
                        });
                    }
                }

                return dispatch({
                    [CALL_API]: {
                        ...callApi,
                        actions: newActions,
                    },
                });
            },
        };
    }

    return {
        ...props,
        setHttpComponent: uid => dispatch(setHttpComponent(uid)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(HTTPComponent);
