'use strict';

var app = app || {};
(module => {

  const newsListPage = {};
  const template = Handlebars.compile($('#feedView-template').html())

  newsListPage.init = () => {
    app.Article.fetchAllArticles().then(() => {
      renderArticles()
    })
  }

  function renderArticles() {
    $('#home-link, #logout-link, #pref-link, #signup-modal, #pref-page').hide()
    $('#feedView-template, #login-link, #signup-link').show()
    $('#feedView-template').empty()
    app.Article.all.forEach((articleData, i) => {
      articleData.id = i;
      var date = new Date(articleData.publishedAt);
      articleData.publishedAt = timeSince(date);
      let articleTemplate = template(articleData);
      $('#anchor').append(articleTemplate);
      if (articleData.author === null) {
        $(`.feed-wrapper[id='${i}'] > div > div > h2`).addClass('article-author-noshow');
      }
    })
  }

  // format the date into a human-readable format
  function timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);
    var minutes = Math.floor(seconds / 60);
    var hours = Math.floor(minutes / 60);
    var days = Math.floor(hours / 24);

    if (minutes < 60) {
      // minutes
      return minutes + " minutes";
    } else {
      // hours
      if (hours < 2) {
        return hours + " hour";
      } else if (hours < 24) {
        return hours + " hours";
      } else {
        // days
        if (days < 2) {
          return days + " day";
        } else {
          return days + " days";
        }
      }
    }
  }

  // testing
//   $(window).scroll(function(){
//     if ($(window).scrollTop() == $(document).height()-$(window).height()){
//         app.Article.fetchAllArticles().then(() => {
//           renderArticles()
//         })
//     }
// });

  module.newsListPage = newsListPage
})(app)

