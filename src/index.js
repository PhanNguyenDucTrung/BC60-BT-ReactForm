import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

// setup redux
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { rootReducer } from './redux/reducers/rootReducer.js';

const store = createStore(rootReducer);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
