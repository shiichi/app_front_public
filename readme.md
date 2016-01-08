# 予約決済システム

cd droview-front/node_modules/
git clone https://github.com/rackerlabs/snappit-mocha-protractor.git
cd snappit-mocha-protractor
-------------------------
edit package.jason
    "lwip": "0.0.8",
    "node-resemble": "*",
-------------------------
npm install
rm -rf .git
cd droview-front/node_modules/snappit-mocha-protractor/node_modules/lwip
node-gyp rebuild