import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,HashRouter} from 'react-router-dom'

import './index.css';
import App from './components/comment/index';
import MyHome from './pages/router_1/index'

/**
ReactDOM.render(
    <App />,
  document.getElementById('root')
);
 */

ReactDOM.render(
  <BrowserRouter>
    <MyHome />
  </BrowserRouter>
 ,
document.getElementById('root')
);
