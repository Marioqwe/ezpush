import React from 'react';
import ReactDOM from 'react-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

import configureStore from './config';
import Root from './site';

const { store, persistor } = configureStore();

const render = (Component) => {
    ReactDOM.render(
        <PersistGate loading={null} persistor={persistor}>
            <Provider store={store}>
                <Component />
            </Provider>
        </PersistGate>,
        document.getElementById('react-root'),
    );
};

render(Root);

if (module.hot) {
    module.hot.accept('./site', () => { render(Root); });
}
