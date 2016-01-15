import 'babel-core/polyfill';
import React from 'react';
import { render } from 'react-dom';
import Root from './js/containers/Root';
//css
import 'admin-lte';
//import { AdminLTE, Skin } from 'admin-lte';

render(
  <Root/>,
  document.getElementById('root')
);
