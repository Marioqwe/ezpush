import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { createTransform } from 'redux-persist';

const blacklistTransform = createTransform(
    (inboudState, key) => {
        if (key === 'common') {
            return { ...inboudState, currentUrl: undefined };
        }
        return inboudState;
    },
);

export default {
    blacklist: ['modal'],
    key: 'root',
    storage,
    transforms: [blacklistTransform],
    stateReconciler: autoMergeLevel2,
};
