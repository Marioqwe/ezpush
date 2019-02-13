import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';

import apiMiddleware from 'lib/api-middleware/jwt';
import persistConfig from './persist';
import rootReducer from './reducer';


const logger = createLogger({ collapsed: true });

const persistedReducer = persistReducer(persistConfig, rootReducer);

const configureStore = (initialState) => {
    const store = createStore(
        persistedReducer,
        initialState,
        applyMiddleware(
            thunk,
            apiMiddleware,
            logger,
        ),
    );
    const persistor = persistStore(store);

    if (module.hot) {
        module.hot.accept('./reducer',
            () => store.replaceReducer(require('./reducer').rootReducer));
    }

    return { store, persistor };
};

export default configureStore;
