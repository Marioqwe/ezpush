import jwtDecode from 'jwt-decode';

import {
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    SIGNUP_SUCCESS,
} from 'onboarding/redux/types';
import { TOKEN_RECEIVED, TOKEN_FAILURE } from './types';

export default (
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
