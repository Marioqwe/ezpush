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
                ...jwtDecode(action.payload.access),
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
                ...jwtDecode(action.payload.access),
            },
            refresh: {
                token: action.payload.refresh,
                ...jwtDecode(action.payload.refresh),
            },
        };
    default:
        return state;
    }
};
