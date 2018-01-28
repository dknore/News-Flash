'use strict';

var app = app || {};

(module => {

  const API_URL = '/sources';
  const Source = {};
  Source.all = [];

  Source.fetchAllSources = () => {
    return $.getJSON(API_URL).then(sourceData => {
      Source.all = sourceData;
    }).catch(error => console.error(error));
  }

  module.Source = Source;
})(app)