const logInError = function() {
    $('#error-text').css('color', '#C70039');
    $('#password').val('');
}

module.exports = {
    logInError
}