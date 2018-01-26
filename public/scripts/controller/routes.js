'use strict';

page('/*', (ctx, next) => {
  $('.page').hide();
  next();
});

page('/', () => { 
  page.redirect('/home');
  $('.save-button').hide();
});

page('/home', () => { 
  app.newsListPage.init();
  isUserLoggedIn();
});

page('/login', () => {
  app.loginView.init();
  isUserLoggedIn();
});

page('/signup', () => {
  app.signUpView.init();
  $('#signUp').show();
  $('.feed-wrapper').hide();
  localStorage.clear();
});

page('/preferences', () => {
  isUserLoggedIn();
  app.preferenceView.init();
  $('.save-button').show();
  $('.feed-wrapper, #signUp').hide();
});

page('/error', () => {
  $('.page').hide();
  $('#error-page').show();
});

page.start();
