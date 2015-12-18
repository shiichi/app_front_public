import { jsdom } from 'jsdom'

global.document = jsdom('<!doctype html><html><body><meta name="_token" content="testToken"/></body></html>')
global.window = document.defaultView
global.navigator = global.window.navigator
