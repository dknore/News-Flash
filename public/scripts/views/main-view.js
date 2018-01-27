'use strict';

var app = app || {};
(module => {

  const newsListPage = {};
  let page = 1;
  var loadingArticles = false;
  const template = Handlebars.compile($('#feedView-template').html())

  newsListPage.init = () => {
    $('#home-page').show();
    $('#home-link, #pref-page, #panel').hide();

    $(this).scrollTop(0);
    page = 1;
    let sources = JSON.parse(localStorage.getItem('PREFS'));
    if (sources === null) {
      sources = "";
    }
    app.Article.fetchAllArticles(page, sources).then(() => {
      renderArticles()
    })
  }

  function renderArticles() {
    app.Article.all.forEach((articleData, i) => {
      articleData.id = i;
      // format the time stamp
      var date = new Date(articleData.publishedAt);
      articleData.publishedAt = timeSince(date);

      if (articleData.author && articleData.author.indexOf("By ") === -1 && articleData.author != articleData.title) {
        // add the 'By ' prefix to the author
        articleData.author = `By ${articleData.author}`;
      }
      if (articleData.author && articleData.author.indexOf("www.") >= 0) {
        // if the title is a url instead of text
        articleData.author = null;
      }
      // inject a comma between the author and news outlet
      if (articleData.author && articleData.source.name) {
        articleData.source.name = `, ${articleData.source.name}`;
      }

      if (articleData.urlToImage) {
        if (articleData.urlToImage.indexOf("https://") === -1 && articleData.urlToImage.indexOf("www.") >= 0) {
         articleData.urlToImage = articleData.urlToImage.replace("http://", "https://");
        }
      }

      // look for Duplicate articles, the News Api is not perfect :'(
      var domElements = document.body.getElementsByTagName('*');
      var foundDup = false;
      for (var i = 0; i < domElements.length; i++) {
        if (domElements[i].id === "title") {
          if (domElements[i].innerHTML === articleData.title) {
            foundDup = true;
          }
        }
      }

      if (!foundDup) {
        let articleTemplate = template(articleData);
        $('#anchor').append(articleTemplate);
      }
    })

    loadingArticles = false;
    page++;
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
  $(window).scroll(function() {
    if ($("#panel").is(":visible")) {
      $("#panel").hide();
    }

    if ($(window).scrollTop() == $(document).height()-$(window).height()) {
      if (!loadingArticles) {
        loadingArticles = true;
        let sources = JSON.parse(localStorage.getItem('PREFS'));
        if (sources === null) {
          sources = "";
        }
        app.Article.fetchAllArticles(page, sources).then(() => {
          renderArticles()
        })
      }
    }
});

  module.newsListPage = newsListPage
})(app)

