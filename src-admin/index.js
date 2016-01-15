import 'babel-core/polyfill';
import React from 'react';
import { render } from 'react-dom';
import Root from './js/containers/Root';
//css
import './theme/AdminLTE/dist/css/AdminLTE.min.css';
import './theme/AdminLTE/dist/css/skins/skin-black.min.css';

render(
  <Root/>,
  document.getElementById('root')
);
