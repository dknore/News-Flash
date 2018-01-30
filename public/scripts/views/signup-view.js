'use strict';

var app = app || {};
(module => {

  const signUpView = {};

  $('.modalj').hide();
  
  signUpView.init = () => {
    $('#home-link, #signup-modal, .save-button').show();
    $('#panel, #login-link, #signup-link, #pref-link').hide();
    
    var loginList = localStorage.loginData;
    
    if (loginList === undefined || loginList === null) {
      loginList = [];
    } else {
      loginList = JSON.parse(loginList);
    };

    $('#signUpBtn').on('click', (event) => {
      event.preventDefault();
      let userEmail = document.getElementById('signup-email').value
      let userPassword = document.getElementById('signup-password').value

      if (userEmail && userPassword !== "") {
        localStorage.setItem('EMAIL-KEY', JSON.stringify(userEmail));
        localStorage.setItem('PASSWORD-KEY', JSON.stringify(userPassword));
        $('#pref-link').show();
        page('/preferences');
      } else {
        alert('All Fields must be filled out');
      };
    });
  };

  module.signUpView = signUpView;
})(app);