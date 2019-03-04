import * as types from './types';

export function setHttpComponent(uid) {
    return {
        type: types.SET_HTTP_COMPONENT,
        httpComponentPayload: {
            uid,
            isWaiting: false,
            completed: false,
            errors: {},
        },
    };
}
