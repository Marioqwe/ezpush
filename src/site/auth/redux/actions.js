import { BASE_URL, DEBUG } from 'config/settings';
import { CALL_API } from 'lib/api-middleware/middleware';
import { generateAccessJWT, generateRefreshJWT } from 'lib/api-middleware/jwt/utils';
import * as types from './types';

export const login = (email, password) => {
    return {
        [CALL_API]: {
            url: `${BASE_URL}/auth/token/obtain`,
            method: 'POST',
            data: { email, password },
            devMode: DEBUG,
            mockResponse: {
                "refresh": generateRefreshJWT(),
                "access": generateAccessJWT(),
            },
            actions: [
                types.LOGIN_REQUEST,
                types.LOGIN_SUCCESS,
                types.LOGIN_FAILURE,
            ],
        }
    };
};
