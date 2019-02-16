import { isRefreshTokenExpired } from 'lib/api-middleware/jwt/utils';

export const isAuthenticated = state => !!isRefreshTokenExpired(state);
