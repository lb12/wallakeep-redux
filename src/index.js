import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './components/App/App.jsx';
import * as serviceWorker from './serviceWorker';

import * as API from './services/APIService';

API.getTags().then( res => {
    console.log(res);
});

API.listAdverts({}, 5, 2).then( res => {
    console.log(res);
});

API.getAdvertById("5dadce10717326158c572a7a").then( res => {
    console.log(res);
});




render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
