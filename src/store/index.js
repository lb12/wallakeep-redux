import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import * as reducers from './reducers';

/**
 * Store configuration
 * @param [preloadedState] The initial state to restore a previously serialized user session
 */
export const storeConfiguration = preloadedState => {
    const reducer = combineReducers(reducers);
    return createStore(reducer, preloadedState, composeWithDevTools());
};
