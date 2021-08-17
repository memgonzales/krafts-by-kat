/* JavaScript file for redirecting the user to the landing page if they sign up successfully */

$(document).ready(function() {
    $('#continue-btn').on('click', function() {
        window.location.replace('/');
    });
});