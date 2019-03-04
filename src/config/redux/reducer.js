import { combineReducers } from 'redux';

import { jwtReducer } from 'auth/redux/reducers';
import { commonReducer, httpComponentReducer } from 'common/redux/reducers';
import { LOGOUT } from 'common/redux/types'
import { groupsReducer } from 'site/protected/redux/reducers';

const appReducer = combineReducers({
    common: commonReducer,
    jwt: jwtReducer,
    httpComponent: httpComponentReducer,
    groups: groupsReducer,
});

const rootReducer = (state, action) => {
    const filteredState = action.type === LOGOUT ? undefined : state;
    return appReducer(filteredState, action);
};

export default rootReducer;
