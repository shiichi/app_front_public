require('babel/register');
var ScreenShotReporter = require('protractor-screenshot-reporter');

exports.config = {
  // specの実行前に、protractorが準備できたら一度だけ呼ばれる関数
  onPrepare: function () {
    browser.ignoreSynchronization = true;
    screenshot = require('snappit-mocha-protractor');
  },
  //seleniumAddress: 'http://localhost:4444/wd/hub',
  seleniumAddress: 'http://l.com:4444/wd/hub',
  multiCapabilities: [
    {browserName: 'firefox'}
  ],
  specs: ['test/EndToEnd/*.spec.js'],
  // directConnect: true,
  // capabilities: {
  //   'browserName': 'firefox'
  // },
  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    reporter: "spec",
    slow: 3000,
    enableTimeouts: false
  }
};

