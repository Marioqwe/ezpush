import * as types from './types';

export function setCurrentUrl(url) {
    return {
        type: types.SET_URL,
        url,
    };
}

export function logout() {
    return {
        type: types.LOGOUT,
    };
}
