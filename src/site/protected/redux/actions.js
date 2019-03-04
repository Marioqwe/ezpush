import uuid from 'uuid';

import { BASE_URL, DEBUG } from 'config/settings';
import { CALL_API } from 'lib/api-middleware/middleware';
import { withAuth } from 'lib/api-middleware/jwt/utils';
import * as types from './types';

export function createGroup(name, description) {
    return {
        [CALL_API]: {
            url: `${BASE_URL}/groups/`,
            method: 'POST',
            data: { name, description },
            headers: withAuth({}),
            devMode: DEBUG,
            mockResponse: {name, description, gid: uuid()},
            actions: [
                types.CREATE_GROUP_REQUEST,
                types.CREATE_GROUP_SUCCESS,
                types.CREATE_GROUP_FAILED,
            ],
        },
    };
}

export function deleteGroup(gid) {
    return {
        [CALL_API]: {
            url: `${BASE_URL}/groups/${gid}/`,
            method: 'POST',
            headers: withAuth({}),
            devMode: DEBUG,
            actions: [
                types.DELETE_GROUP_REQUEST,
                {
                    type: types.DELETE_GROUP_SUCCESS,
                    gid,
                },
                types.DELETE_GROUP_FAILED,
            ],
        },
    };
}
