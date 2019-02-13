import jwtDecode from 'jwt-decode';

import * as types from './types';

export default (
    state = {
        access: undefined,
        refresh: undefined,
        error: undefined,
    },
    action,
) => {
    switch (action.type) {
    case types.TOKEN_RECEIVED:
        return {
            ...state,
            access: {
                token: action.payload.access,
                ...jwtDecode(action.payload.access),
            },
        };
    case types.TOKEN_FAILURE:
        return {
            // todo: set error
            error: undefined,
        };
    default:
        return state;
    }
};
