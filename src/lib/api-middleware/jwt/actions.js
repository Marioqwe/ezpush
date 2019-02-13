import * as settings from '../settings';
import * as types from './types';
import { CALL_API } from '../middleware';

export const refreshAccessToken = token => ({
    [CALL_API]: {
        url: settings.JWT_REFRESH_URL,
        method: 'POST',
        headers: {},
        data: settings.buildData(token),
        actions: [
            types.TOKEN_REQUEST,
            types.TOKEN_RECEIVED,
            types.TOKEN_FAILURE,
        ],
    },
});
