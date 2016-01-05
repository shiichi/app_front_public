require('babel/register');

exports.config = {
  // specの実行前に、protractorが準備できたら一度だけ呼ばれる関数
  onPrepare: function () {
    browser.ignoreSynchronization = true;
  },

  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['test/EndToEnd/*.spec.js'],
  directConnect: true,
  capabilities: {
    'browserName': 'chrome'
  },
  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    reporter: "spec",
    slow: 3000,
    enableTimeouts: false
  }
};