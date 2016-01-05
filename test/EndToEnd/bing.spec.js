// import assert from "power-assert";
// import BingPageObject from "./bing"

// describe('Bing.com', () => {
//     let page;
//     let query = '天気';

//     before(async() => {
//         page = new BingPageObject();
//         page.getPage();
//         await page.search(query);
//     });

//     it('検索窓に入力したクエリが表示されている', async() => {
//          let text = await page.getQuery();
//          assert(text === query);
//     });

//     it('アルゴが表示されている', async() => {
//         let algo = await page.getAlgo();
//         assert(algo.length === 10);
//     });
// });