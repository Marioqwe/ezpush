import * as types from './types';

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
    default:
        return state;
    }
};
