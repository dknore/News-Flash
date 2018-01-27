'use strict';

var modal = document.getElementById('login-modal');
var loginLink = document.getElementById("login-link");

$(document).ready(function() {
    $('#navbar-toggle').on('click', function() {
        $("#panel").slideToggle();
    });

    // hide the Login modal
    modal.style.display = "none";
});


// when user presses the 'Log Out' menu item
$('#logout-link').on('click', (event) => {
    event.preventDefault();
    localStorage.clear();
    $('.pref-link, #logout-link').hide();
    $('#login-link, #signup-link').show();

    $('#anchor').empty()
    app.Article.all = [];
    page('/home');
});


loginLink.onclick = function () {
  modal.style.display = "flex";
}

// check if user is logged in
function isUserLoggedIn () {
    let userEmail = JSON.parse(localStorage.getItem('EMAIL-KEY'));
    let userPassword = JSON.parse(localStorage.getItem('PASSWORD-KEY'));
    if (userEmail !== null && userPassword !== null) {
        $('#login-link, #signup-link').hide();
        $('#pref-link, #logout-link').show();
    } else {
        $('#login-link, #signup-link').show();
        $('#pref-link, #logout-link').hide();
    }
}

