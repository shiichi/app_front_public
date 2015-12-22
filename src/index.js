import 'babel-core/polyfill';
import React from 'react';
import { render } from 'react-dom';
import { createHistory, useBasename } from 'history';
import Root from './js/containers/Root';

const history = useBasename(createHistory)({
  basename: '/mypage'
});

render(
  <Root history={history} />,
  document.getElementById('root')
);
