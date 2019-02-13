export function accessToken(state) {
    const { access } = state.jwt;
    return access ? access.token : undefined;
}

export function refreshToken(state) {
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
        Authorization: `Bearer ${accessToken(state)}`,
    });
}
