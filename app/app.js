import React from 'react';
import ReactDOM from 'react-dom';
import store from './store';
import App from './components/App';
import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
