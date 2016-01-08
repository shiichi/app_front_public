// import expect from 'expect';
// import LoginObject from "./login"

// describe('Login Page', () => {
//   let page;
//   const email = 'user2@user.com';
//   const password1 = '1234';
//   const password2 = '11111111';

//   before(async() => {
//     page = new LoginObject();
//     page.getPage();
//   });

//   it('should be rendered with URL http://l.com/auth/login', async() => {
//     let title = await page.getTitle();
//     expect(title).toEqual('Application');
//   });

//   it('should call error message if login fail', async() => {
//     await page.login(email, password2);
//     let url = await page.getCurrentUrl();
//     expect(url).toEqual('http://l.com/auth/login');
//   });

//   it('should redirect to mypage if login success', async() => {
//     await page.login(email, password1);
//     let url = await page.getCurrentUrl();
//     expect(url).toEqual('http://l.com/mypage/reserve');
//   });

//   it('should link to ticket', async() => {
//     await page.buyTicket();
//     let url = await page.getCurrentUrl();
//     expect(url).toEqual('http://l.com/mypage/ticket');
  
//   });

//   it('should render amount correctly', async() => {
//     await page.clickAddTicket();
//     let num = await page.getPayment();
//     expect(num[0]).toEqual('2000');
//   });

//   it('should render amount correctly', async() => {
//     await page.clickAddTicket();
//     let num = await page.getPayment();
//     expect(num[0]).toEqual('3000');
//   });

//   it('should render amount correctly', async() => {
//     await page.clickAddTicket();
//     let num = await page.getPayment();
//     expect(num[0]).toEqual('4000');
//   });

//   it('should render amount correctly', async() => {
//     await page.clickSubTicket();
//     let num = await page.getPayment();
//     expect(num[0]).toEqual('3000');
//   });
// });

