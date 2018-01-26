'use strict';

var app = app || {};

(module => {

  const API_URL = '/articles';
  const Article = {};
  Article.all = [];

  Article.fetchAllArticles = (page, sources) => {
    return $.getJSON(`${API_URL}/${page}/${sources}`).then(articleData => {
      Article.all = articleData;
    }).catch(error => console.error(error));
  }

  module.Article = Article;
})(app)