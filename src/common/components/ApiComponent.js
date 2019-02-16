import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { CALL_API } from 'lib/api-middleware/middleware';
import { setApiComponent } from '../redux/actions';

class ApiComponent extends React.Component {
    static propTypes = {
        /** This is the redux store's currentApiComponent. */
        apiComponent: PropTypes.shape({
            uid: PropTypes.string,
            errors: PropTypes.shape(/* todo */),
            isWaiting: PropTypes.bool,
            completed: PropTypes.bool,
        }),

        /** A unique identifier for the api component. This value is used
         * to identify the api component in the redux store. */
        uid: PropTypes.string.isRequired,

        /** This is just the component to be wrapped by the api component. */
        component: PropTypes.func,

        /** This function should render the content if no ``component``.
         * Note that ``component`` has priority over this prop. */
        render: PropTypes.func,

        /**  */
        setApiComponent: PropTypes.func.isRequired,
    };

    static defaultProps = {
        render: () => {},
        component: undefined,
        apiComponent: {},
    };

    constructor(props) {
        super(props);
        this._isMounted = false;
    }

    componentDidMount() {
        this._isMounted = true;
        const {
            setApiComponent, // eslint-disable-line no-shadow
            uid,
        } = this.props;
        setApiComponent(uid);
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
            apiComponent,
            ...rest
        } = this.props;

        let props = {
            isWaiting: false,
            completed: false,
            errors: {},
            uid,
            setApiComponent, // do not pass this down to the ``component``
            ...rest,
        };
        if (apiComponent !== undefined) props = { ...props, ...apiComponent };

        return component
            ? React.createElement(component, props)
            : render(props);
    }
}

const mapStateToProps = (state, ownProps) => {
    const { stateProps } = ownProps;
    if (stateProps !== undefined) {
        return {
            ...stateProps(state),
            apiComponent: state.apiComponent[ownProps.uid],
        };
    }
    return {
        apiComponent: state.apiComponent[ownProps.uid],
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    const {
        // A function that takes ``dispatch`` as an argument
        // and returns a dictionary. The kv-pairs will be
        // passed as properties to the ``component`` rendered
        // by the ``ApiComponent``.
        //
        // It is assumed that each kv-pair returned by this
        // function is a redux action that needs to be binded
        // with redux's ``dispatch``.
        dispatchProps,

        // Same as ``dispatchProps`` but .....
        actions,
    } = ownProps;
    let props = {};
    if (dispatchProps !== undefined) {
        props = {
            ...props,
            ...dispatchProps(dispatch),
        };
    }

    if (actions !== undefined) {
        Object.keys(actions).forEach((key) => {
            const action = actions[key];
            const newAction = (...args) => {
                const value = action(...args);
                const callApi = value[CALL_API];
                if (callApi === undefined) {
                    throw new Error(`Action with key '${key}' is not \`\`CALL_API\`\`-compatible`);
                }

                if (callApi.actions === undefined) {
                    // It's not our job to raise an error
                    // here. Let the api-middleware do that.
                    return dispatch(value);
                }

                let hasError = false;
                const newCAActions = [];
                callApi.actions.forEach((caAction, index) => {
                    let __caAction = caAction;
                    if (typeof __caAction === 'string') {
                        __caAction = { type: __caAction };
                    } else if (typeof __caAction !== 'object') {
                        hasError = true;
                        return;
                    }

                    if (index === 0) { // request action
                        newCAActions.push({
                            ...__caAction,
                            apiComponentPayload: {
                                isWaiting: true,
                                uid: ownProps.uid,
                                errors: {},
                                completed: false,
                            },
                        });
                    } else if (index === 1) { // request success
                        newCAActions.push({
                            ...__caAction,
                            apiComponentPayload: {
                                isWaiting: false,
                                uid: ownProps.uid,
                                errors: {},
                                completed: true,
                            },
                        });
                    } else if (index === 2) { // request failed
                        newCAActions.push({
                            ...__caAction,
                            apiComponentPayload: {
                                isWaiting: false,
                                uid: ownProps.uid,
                                errors: {},
                                completed: false,
                            },
                        });
                    } else {
                        hasError = true;
                    }
                });

                if (hasError) {
                    // It's not our job to raise an error
                    // here. Let the api-middleware do that.
                    return dispatch(value);
                }

                return dispatch({
                    [CALL_API]: {
                        ...callApi,
                        actions: newCAActions,
                    },
                });
            };

            props = { ...props, [key]: newAction };
        });
    }

    return {
        ...props,
        setApiComponent: uid => dispatch(setApiComponent(uid)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ApiComponent);
