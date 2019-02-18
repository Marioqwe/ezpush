import jwtDecode from 'jwt-decode';

import {
    TOKEN_RECEIVED,
    TOKEN_FAILURE,
} from 'lib/api-middleware/jwt/types';
import { DEBUG } from 'config/settings';
import {
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    SIGNUP_SUCCESS,
} from './types';

function decode(encodedJwt, tokenValue) {
    if (DEBUG) return { token: tokenValue || 'tokenValue' };
    return jwtDecode(encodedJwt);
}

export const jwtReducer = (
    state = {
        access: undefined,
        refresh: undefined,
        error: undefined,
    },
    action,
) => {
    switch (action.type) {
    case TOKEN_RECEIVED:
        return {
            ...state,
            access: {
                token: action.payload.access,
                ...decode(action.payload.access, 'accessToken'),
            },
        };
    case TOKEN_FAILURE:
    case LOGIN_FAILURE:
        return {
            // todo: set error
            error: undefined,
        };
    // note: comment out below line because admin needs
    // to approve account first.
    // case SIGNUP_SUCCESS:
    case LOGIN_SUCCESS:
        return {
            access: {
                token: action.payload.access,
                ...decode(action.payload.access, 'accessToken'),
            },
            refresh: {
                token: action.payload.refresh,
                ...decode(action.payload.refresh, 'refreshToken'),
            },
        };
    default:
        return state;
    }
};
