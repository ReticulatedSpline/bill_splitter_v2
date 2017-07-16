import { UtilitesPage } from './app.po';

describe('utilites App', () => {
  let page: UtilitesPage;

  beforeEach(() => {
    page = new UtilitesPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
