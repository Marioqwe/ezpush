import { combineReducers } from 'redux';

import { jwtReducer } from 'auth/redux/reducers';
import { commonReducer } from 'common/redux/reducers';
import { LOGOUT } from 'auth/redux/types'

const appReducer = combineReducers({
    common: commonReducer,
    jwt: jwtReducer,
});

const rootReducer = (state, action) => {
    const filteredState = action.type === LOGOUT ? undefined : state;
    return appReducer(filteredState, action);
};

export default rootReducer;
