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
    return submit.click();
  }

  async addTicket() {
    let button = await $('.btn-add');
    return button.click();
  }

  async grtNum() {
    var input = element(by.css('.input-area')).$$('input')
    return await input.getAttribute('value');
  }

  async buyTicket() {
    let ticket = await $('.ticket');
    return await ticket.click();
  }
}


