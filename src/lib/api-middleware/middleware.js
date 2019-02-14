import axios from 'axios';

import validateCallApi from './validateCallApi'

export const CALL_API = 'CALL_API';
export const NO_INTERNET_CONNECTION = 'NO_INTERNET_CONNECTION';
export const CONNECTION_TIMEOUT = 'CONNECTION_TIMEOUT';

export const middleware = ({ dispatch, getState }) => {
    return next => (action, props) => {
        const _props = props || validate(action, getState);
        // todo: redundant check if props is not undefined.
        if (_props === undefined) return next(action);
        const {
            url,
            headers,
            method,
            actions,
            data,
            devMode = false,
        } = _props;

        const [requestAction, successAction, failureAction] = actions;
        next(requestAction);

        if (!devMode) {
            return axios({
                url,
                method,
                headers,
                data,
            })
                .then(response => next({
                    ...successAction,
                    payload: {...response.data},
                }), (error) => {
                    if (error.code === 'ECONNABORTED'
                        || (error.response !== undefined && error.response.status === 408)) {
                        return next({
                            ...failureAction,
                            type: CONNECTION_TIMEOUT,
                        });
                    }

                    if (error.response === undefined) {
                        return next({
                            ...failureAction,
                            type: NO_INTERNET_CONNECTION,
                        });
                    }

                    return next({
                        ...failureAction,
                        payload: {...error.response.data},
                    });
                });
        } else {

        }
    };
};

export const validate = (action, getState) => {
    const callApi = action[CALL_API];
    if (typeof callApi === 'undefined') return;

    return validateCallApi(callApi, getState);
};
