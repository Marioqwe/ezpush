export function isRefreshTokenExpired(state) {
    const { refresh } = state.jwt;
    if (refresh && refresh.exp) {
        return 1000 * refresh.exp - (new Date()).getTime() < 5000;
    }
    return true;
}

export function isAuthenticated(state) {
    return !isRefreshTokenExpired(state);
}
