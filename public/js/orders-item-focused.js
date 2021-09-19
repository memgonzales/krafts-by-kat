/* JavaScript file for handling the downloading of company logos uploaded by the clients */

$(document).ready(function() {
    /* Check if the client uploaded a company logo */
    if ($('#company-logo-presence').text().trim().length == 0) {
        $('#company-logo-section').remove();
        $('#company-logo-photo').remove();
    }

    /* Retrive the file details and construct a cleaner file name */
    const logo = $('#company-logo-photo').attr('src');
    const logoTokens = logo.split('.');
    const extension = logoTokens[logoTokens.length - 1];

    const sanitizedFilename = $('#company-logo-filename').text() + '.' + extension;

    $('#company-logo-filename').text(sanitizedFilename);
    $('#company-logo-download').attr('download', sanitizedFilename);
});