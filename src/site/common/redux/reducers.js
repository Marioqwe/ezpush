import { NO_INTERNET_CONNECTION, CONNECTION_TIMEOUT } from 'lib/api-middleware/middleware';
import { SET_HTTP_COMPONENT } from 'lib/api-middleware/http-component/types';
import { LOGIN_SUCCESS } from 'auth/redux/types';
import * as types from './types';

export const httpComponentReducer = (state = {}, action) => {
    const payload = action.httpComponentPayload;
    if (payload === undefined) return state;

    switch (action.type) {
    case SET_HTTP_COMPONENT:
        return {
            ...state,
            [payload.uid]: {
                uid: payload.uid,
                isWaiting: (state[payload.uid] !== undefined
                    && !state[payload.uid].completed) ? state[payload.uid].isWaiting : false,
                completed: false,
            },
        };
    case CONNECTION_TIMEOUT:
    case NO_INTERNET_CONNECTION:
        return {
            ...state,
            [payload.uid]: {
                ...state[payload.uid],
                isWaiting: false,
            },
        };
    default:
        return {
            ...state,
            [payload.uid]: {
                ...payload,
            },
        };
    }
};

export const commonReducer = (
    state = {
        appName: 'EZPush',
        currentUrl: undefined,
        redirectTo: undefined,
    },
    action,
) => {
    switch (action.type) {
    case types.SET_URL:
        return {
            ...state,
            currentUrl: action.url,
            redirectTo: undefined,
        };
    case LOGIN_SUCCESS:
        return {
            ...state,
            redirectTo: '/',
        };
    default:
        return state;
    }
};
