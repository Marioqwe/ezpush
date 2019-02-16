import { BASE_URL } from 'config/settings';
import { CALL_API } from 'lib/api-middleware/middleware';
import * as types from './types';

const isProduction = (process.env.NODE_ENV === 'production');

export const login = (email, password) => ({
    [CALL_API]: {
        url: `${BASE_URL}/auth/token/obtain`,
        method: 'POST',
        data: { email, password },
        devMode: !isProduction,
        mockResponse: { 'foo': 'bar' },
        actions: [
            types.LOGIN_REQUEST,
            types.LOGIN_SUCCESS,
            types.LOGIN_FAILURE,
        ],
    }
});
