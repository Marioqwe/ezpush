import { refreshAccessToken } from './actions';
import {
    getRefreshToken,
    isRefreshTokenExpired,
    isAccessTokenExpired,
} from './utils';
import {
    TOKEN_RECEIVED,
    FAILED_AUTH,
} from './types';

const createMiddleware = (api) => {
    let pending = [];

    return ({ dispatch, getState }) => {
        const _apiMiddleware = api.middleware({ dispatch, getState });

        const nextCheckPending = props => next => (nextAction) => {
            if (nextAction.type === TOKEN_RECEIVED) {
                next(nextAction);
                pending.forEach(action => _apiMiddleware(next)(action, props));
                pending = [];
            } else {
                next(nextAction);
            }
        };

        return next => (action) => {
            const props = api.validate(action, getState);
            if (props === undefined) {
                return next(action);
            }

            const { headers } = props;
            if (!('Authorization' in headers)) {
                return _apiMiddleware(next)(action, props);
            }

            const state = getState();
            const rToken = getRefreshToken(state);
            if (rToken && isAccessTokenExpired(state)) {
                if (isRefreshTokenExpired()) return next({ type: FAILED_AUTH });
                pending.push(action);
                if (pending.length === 1) {
                    const nextCheckPending = nextCheckPending(next);
                    return _apiMiddleware(nextCheckPending(props))(refreshAccessToken(rToken), props)
                }

                return;
            }

            return _apiMiddleware(next)(action, props);
        };
    }
};

export default createMiddleware;
