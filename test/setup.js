import { jsdom } from 'jsdom'

global.document = jsdom('<!doctype html><body>' +
  '<meta name="_token" content="testToken"/>' +
  '<meta name="domain" content="http://l.com">' +
  '</body></html>');
global.window = document.defaultView;
global.navigator = global.window.navigator;
