import { NailSolutionPage } from './app.po';

describe('nail-solution App', () => {
  let page: NailSolutionPage;

  beforeEach(() => {
    page = new NailSolutionPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
