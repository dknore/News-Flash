'use strict';

var app = app || {};

(module => {

  const preferenceView = {};
  const idList = [];
  const nameList = [];
  let selectedList = [];

  preferenceView.init = () => {
    $('#home-page, #pref-link, #panel').hide();
    $('#home-link, #pref-page, .save-button').show();
    selectedList = [];
    $('.left-col, .right-col').empty();

    app.Source.fetchAllSources().then(() => {
      app.Source.all.forEach((source, i) => {
        idList.push(source.id)
        nameList.push(source.name)

        if (i % 2 == 0) {
          $('.left-col').append(`<label class="container">${source.name}
          <input class="source" id=${source.id} type="checkbox">
          <span class="checkmark"></span></label>`);
          // $('.left-col').append(`<input class="source" id=${source.id} type="checkbox">${source.name}</input><br>`);
        } else {
          $('.right-col').append(`<label class="container">${source.name}
          <input class="source" id=${source.id} type="checkbox">
          <span class="checkmark"></span></label>`);
          // $('.right-col').append(`<label>${source.name}<input class="source" id=${source.id} type="checkbox">`);
          // $('.right-col').append(`<input class="source" id=${source.id} type="checkbox">${source.name}</input><br>`);
        }
      });
      // $('.name-list').show();
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
