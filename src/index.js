import React from 'react';
import ReactDOM from 'react-dom';
import { PersistGate } from 'redux-persist/integration/react';

import configureStore from './config';
import Root from './site';

const { store, persistor } = configureStore();

const render = (Component) => {
    ReactDOM.render(
        <PersistGate loading={null} persistor={persistor}>
            <Component store={store} />
        </PersistGate>,
        document.getElementById('react-root'),
    );
};

render(Root);

if (module.hot) {
    module.hot.accept('./site', () => { render(Root); });
}
