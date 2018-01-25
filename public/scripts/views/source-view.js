'use strict';

var app = app || {};

(module => {

  const preferenceView = {};
  const idList = [];
  const nameList = [];
  const selectedList = [];

  preferenceView.init = () => {
    $('#home-link, #logout-link').show();
    $('#signup-link, #login-link, #pref-link').hide();

    app.Source.fetchAllSources().then(() => {
      app.Source.all.forEach((source) => {
        idList.push(source.id)
        nameList.push(source.name)
        $('.name-list').append(`<input class="source" id=${source.id} type="checkbox">${source.name}</input>`);
      });
      $('.name-list').show();
    });

    $('.save-button').on('click', () => {
      var checkedList = document.getElementsByClassName('source');
      for (var i = 0; i < checkedList.length; i++) {
        if (checkedList[i].checked) {
          selectedList.push(checkedList[i].id);
        }
      }

      console.log('we selected the following news outlets: ' + selectedList);
      $('.name-list, .save-button').fadeOut(500);
      page('/home');
    });
  };





  module.preferenceView = preferenceView;
})(app);
