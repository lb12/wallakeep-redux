import React from 'react';
import { render } from 'react-dom';

import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { storeConfiguration } from './store';
import { initialState } from './store/reducers';
import { getUser, setUser } from './utils/storage'


const preloadedState = { ...initialState, user: getUser() || {} };
const store = storeConfiguration(preloadedState);


// Save any user change into the LocalStorage
store.subscribe(() => {
    const { user } = store.getState();
    user && setUser(user);
});

render(<App store={store} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
