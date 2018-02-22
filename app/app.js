import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import reducer from './reducers/index'
import {createStore} from 'redux';
import {Provider} from 'react-redux';

let store = createStore(reducer);
window.store = store;

ReactDOM.render(<Provider store={store}>
  <App/>
</Provider>, document.getElementById('root'));
