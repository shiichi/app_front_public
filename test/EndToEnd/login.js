export default class LoginObject {
  constructor(url) {
    this.url = 'http://l.com/auth/login';
  }

  async getPage() {
    await this.navigateTo(this.url);
  }

  async navigateTo(url) {
    await browser.get(url);
  }

  async getTitle() {
    let title = await browser.getTitle();
    return title;
  }

  async getCurrentUrl() {
    let url = await browser.getCurrentUrl();
    return url;
  }
  
  async typeEmail(email) {
    let textbox = await $('#email');
    return await textbox.sendKeys(email);
  }
  
  async clearEmail(email) {
    let textbox = await $('#email');
    return await textbox.clear();
  }

  async typePassword(password) {
    let textbox = await $('#password');
    return await textbox.sendKeys(password);
  }

  async login(email, password) {
    await this.clearEmail(email);
    await this.typeEmail(email);
    await this.typePassword(password);

    let submit = await $('.btn-primary');
    return await submit.click();
  }

  async clickAddTicket() {
    let button = await $('.btn-add');
    return await button.click();
  }

  async clickSubTicket() {
    let button = await $('.btn-sub');
    return await button.click();
  }

  async getPayment() {
    var input = element(by.css('.payment')).$$('output')
    return await input.getAttribute('value');
  }

  async buyTicket() {
    let ticket = await $('.ticket');
    return await ticket.click();
  }

  async clickInputCardInfo() {
    //var button = element.all(by.css('#WP_checkoutBox input')).first();
    let button = element(by.css('#WP_checkoutBox')).$$('input');
    return await button.click();
  }

  async InputCardInfo() {
    let button = element(by.css('#webpay-checkout'));
    return await button.click();
  }
}



