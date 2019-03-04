import { isRefreshTokenExpired } from 'lib/api-middleware/jwt/utils';

export function isAuthenticated(state) {
    return !isRefreshTokenExpired(state);
}
