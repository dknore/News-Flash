'use strict';

var app = app || {};

(module => {

  const preferenceView = {};
  const idList = [];
  const nameList = [];
  const selectedList = [];

  preferenceView.init = () => {
    $('#pref-link').hide();
    $('#pref-page, .save-button').show();

    // TODO: delete these 2 lines
    // $('#signup-link, #login-link, #pref-link').hide();
    // $('#home-link, #logout-link, #pref-page, .save-button').show();

    app.Source.fetchAllSources().then(() => {
      app.Source.all.forEach((source) => {
        idList.push(source.id)
        nameList.push(source.name)
        $('.name-list').append(`<input class="source" id=${source.id} type="checkbox">${source.name}</input><br>`);
      });
      $('.name-list').show();
    }).then(() => {
      // compare the sources to the saved prefs
      let sources = JSON.parse(localStorage.getItem('PREFS'));
      if (sources !== null) {
        var checkedList = document.getElementsByClassName('source');
        for (var i = 0; i < checkedList.length; i++) {
          if (sources.some(x => x == checkedList[i].id)) {
            checkedList[i].checked = true;
          }
        }
      }
    });

    // save the current source prefs
    $('.save-button').on('click', () => {
      $('#anchor').empty()
      app.Article.all = [];
      var checkedList = document.getElementsByClassName('source');
      for (var i = 0; i < checkedList.length; i++) {
        if (checkedList[i].checked) {
          selectedList.push(checkedList[i].id);
        }
      }
      localStorage.setItem('PREFS', JSON.stringify(selectedList));

      $('.name-list, .save-button').fadeOut(500);
      page('/home');
    });
  };





  module.preferenceView = preferenceView;
})(app);
