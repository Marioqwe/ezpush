import * as types from './types';

export const groupsReducer = (
    state = {},
    action,
) => {
    switch (action.type) {
    case types.CREATE_GROUP_REQUEST:
        return state;
    case types.CREATE_GROUP_SUCCESS: {
        const newGroup = action.payload;
        return {
            ...state,
            [newGroup.gid]: { ...newGroup }
        };
    }
    case types.CREATE_GROUP_FAILED:
        return state;
    case types.DELETE_GROUP_SUCCESS: {
        const { [action.gid]: value, ...newState } = state;
        return newState;
    }
    default:
        return state;
    }
};
