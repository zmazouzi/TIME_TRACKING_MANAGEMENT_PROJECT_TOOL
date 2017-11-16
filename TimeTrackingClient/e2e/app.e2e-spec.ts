import { TimeTrackingClientPage } from './app.po';

describe('time-tracking-client App', () => {
  let page: TimeTrackingClientPage;

  beforeEach(() => {
    page = new TimeTrackingClientPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
