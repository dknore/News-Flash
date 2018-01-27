'use strict';

page('/*', (ctx, next) => {
  $('.page').hide();
  next();
});

page('/', () => { 
  page.redirect('/home');
  $('#prefButton').hide();
});

page('/home', () => { 
  app.newsListPage.init();
  $('.feed-wrapper').show();
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
  $('#prefButton').show();
  $('.feed-wrapper, #signUp').hide();
});

page('/error', () => {
  $('.page').hide();
  $('#error-page').show();
});

page.start();
