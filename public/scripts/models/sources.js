'use strict';

var app = app || {};

(module => {

  const API_URL = '/sources';
  const Source = {};
  Source.all = [];

  Source.fetchAllSources = () => {
    return $.getJSON(API_URL).then(sourceData => {
      Source.all = sourceData;
      // console.log(Source.all);
    }).catch(error => console.error(error));
  }

  module.Source = Source;
})(app)