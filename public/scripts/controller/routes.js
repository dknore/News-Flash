'use strict';

page('/*', (ctx, next) => {
  $('.page').hide();
  next();
});

page('/', () => { 
  page('/home');
  $('.save-button').hide();
});

page('/home', () => { 
  app.newsListPage.init();
});

page('/login', () => {
  event.preventDefault();
  app.loginView.init();
});

page('/signup', () => {
  event.preventDefault();
  app.signUpView.init();
  $('#signUp').show();
  $('.feed-wrapper').hide();
  localStorage.clear();
});

page('/preferences', () => {
  event.preventDefault();
  app.preferenceView.init();
  $('.feed-wrapper, #signUp').hide();
});

page('/error', () => {
  $('.page').hide();
  $('#error-page').show();
});

page.start();
