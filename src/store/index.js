import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import * as reducers from './reducers';

export const storeConfiguration = () => {
    const reducer = combineReducers(reducers);
    return createStore(reducer, composeWithDevTools());
};
