import { SejmometrPage } from './app.po';

describe('sejmometr App', function() {
  let page: SejmometrPage;

  beforeEach(() => {
    page = new SejmometrPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
