import 'materialize-css/dist/css/materialize.min.css';//this tells the webpack that we are trying to import some file from npm modules.
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

const el = document.getElementById('root');

const root = ReactDOM.createRoot(el);

root.render( <Provider store={store}><App /></Provider>);