import createMiddleware from './createMiddleware';
import * as apiMiddleware from '../middleware';

const {
    middleware,
    validate,
    ...constants,
} = apiMiddleware;

export { constants };

export default createMiddleware({ middleware, validate });
