'use strict';

var app = app || {};
(module => {

  const newsListPage = {};
  let page = 1;
  const template = Handlebars.compile($('#feedView-template').html())

  newsListPage.init = () => {
    $('#home-link, #logout-link, #pref-link, #signup-modal, #pref-page').hide()
    // $('#feedView-template, #login-link, #signup-link').show()
    // $('#feedView-template').empty()
    //$('#home-link').hide()//, #logout-link, #pref-link, #signup-modal').hide()
    $('#feedView-template, #login-link, #signup-link').show()

    $(this).scrollTop(0);
    page = 1;
    let sources = JSON.parse(localStorage.getItem('PREFS'));
    if (sources === null) {
      sources = "";
    }
    app.Article.fetchAllArticles(page, sources).then(() => {
      page++;
      renderArticles()
    })
  }

  function renderArticles() {
    app.Article.all.forEach((articleData, i) => {
      articleData.id = i;
      // format the time stamp
      var date = new Date(articleData.publishedAt);
      articleData.publishedAt = timeSince(date);

      // remove websites are author names
      if (articleData.author !== null) {
        articleData.author = `By ${articleData.author}`;
      }
      if (articleData.author.indexOf("www.") >= 0) {
        articleData.author = null;
      }
      // inject a comma between the author and news outlet
      if (articleData.author != null) {
        articleData.source.name = `, ${articleData.source.name}`;
      }

      let articleTemplate = template(articleData);
      $('#anchor').append(articleTemplate);
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


// Infinite Scrolling
  $(window).scroll(function(){
    if ($("#panel").is(":visible")) {
      $("#panel").hide();
    }

    if ($(window).scrollTop() == $(document).height()-$(window).height()){
        let sources = JSON.parse(localStorage.getItem('PREFS'));
        if (sources === null) {
          sources = "";
        }
        app.Article.fetchAllArticles(page, sources).then(() => {
          page++;
          renderArticles()
        })
    }
});

  module.newsListPage = newsListPage
})(app)

