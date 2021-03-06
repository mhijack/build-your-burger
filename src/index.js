import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';

import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';

import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    burgerBuilderReducer,
    orderReducer,
    authReducer
});

// Redux
// restrict Redux devtool only in development server
const composeEnhancers =
    process.env.NODE_ENV === 'development'
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
        : null;

// Ensuring app doesn't crash in production env
let middleware = applyMiddleware(thunk);

if (composeEnhancers) {
    middleware = composeEnhancers(applyMiddleware(thunk));
}

const store = createStore(
    rootReducer,
    middleware
);

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
