import jwt from 'jwt-simple';

export function getAccessToken(state) {
    const { access } = state.jwt;
    return access ? access.token : undefined;
}

export function getRefreshToken(state) {
    const { refresh } = state.jwt;
    return refresh ? refresh.token : undefined;
}

export function isAccessTokenExpired(state) {
    const { access } = state.jwt;
    if (access && access.exp) {
        return 1000 * access.exp - (new Date()).getTime() < 5000;
    }
    return true;
}

export function isRefreshTokenExpired(state) {
    const { refresh } = state.jwt;
    if (refresh && refresh.exp) {
        return 1000 * refresh.exp - (new Date()).getTime() < 5000;
    }
    return true;
}

export function withAuth(headers = {}) {
    return state => ({
        ...headers,
        Authorization: `Bearer ${getAccessToken(state)}`,
    });
}

export function generateAccessJWT() {
    return jwt.encode({
        token_type: 'access',
        exp: Date.now() + 3600000 // expires in 1 hour
    }, 'secret');
}

export function generateRefreshJWT() {
    return jwt.encode({
        token_type: 'refresh',
        exp: Date.now() + 86400000 // expires in 24 hours
    }, 'secret');
}
