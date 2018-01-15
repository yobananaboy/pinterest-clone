import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './app/component/App';
import configureStore from './app/store/configureStore';
import './css/style.scss';

const store = configureStore();

ReactDOM.render((
  <Provider store={store}>
    	<HashRouter>
    		<App />
    	</HashRouter>
	</Provider>
), document.getElementById('application'));