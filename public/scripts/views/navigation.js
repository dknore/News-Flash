'use strict';

var modal = document.getElementById('login-modal');
var loginLink = document.getElementById("login-link");

$(document).ready(function() {
    $('#navbar-toggle, .navbar-item').on('click', function() {
        $("#panel").slideToggle();
    });

    // hide the Login modal
    modal.style.display = "none";
});

//when user presses LOG OUT
$('#logout-link').on('click', (event) => {
  event.preventDefault();
  localStorage.clear();
  $('.pref-link, #logout-link').hide();
  $('#login-link, #signup-link').show();
});


loginLink.onclick = function () {
  modal.style.display = "flex";
}

// add the close functionality for each nav bar link when the user presses on any of them
function addCloseNavBar () {
    var navbarLinks = document.getElementsByClassName("navbar-item");
    for (var i = 0; i < navbarLinks.length; i++) {
        navbarLinks[i].addEventListener("click", function() {
            $("#panel").stop().slideToggle();
        }, false);
    }
}
addCloseNavBar();
