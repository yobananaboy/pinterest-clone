import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import routes from './app/routes/routes';
import { Provider } from 'react-redux';
import App from './app/component/App';
import configureStore from './app/store/configureStore';
import './css/style.scss';

const store = configureStore(window.__INITIAL_STATE__);

ReactDOM.render((
  <Provider store={store}>
    	<BrowserRouter>
    		{renderRoutes(routes)}
    	</BrowserRouter>
	</Provider>
), document.getElementById('application'));