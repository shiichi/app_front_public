import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import Root from './js/containers/Root';
//css
//import './theme/main.scss';

render(
  <Root/>,
  document.getElementById('root')
);
