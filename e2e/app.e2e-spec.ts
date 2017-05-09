import { GreenNationPage } from './app.po';

describe('green-nation App', () => {
  let page: GreenNationPage;

  beforeEach(() => {
    page = new GreenNationPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
