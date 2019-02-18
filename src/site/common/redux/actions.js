import * as types from './types';

export function setApiComponent(uid) {
    return {
        type: types.SET_API_COMPONENT,
        apiComponentPayload: {
            uid,
            isWaiting: false,
            completed: false,
            errors: {},
        },
    };
}
