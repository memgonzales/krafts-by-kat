$(document).ready(function() {
    const logo = $('#company-logo-photo').attr('src');
    const logoTokens = logo.split('.');
    const extension = logoTokens[logoTokens.length - 1];

    const sanitizedFilename = $('#company-logo-filename').text() + '.' + extension;

    $('#company-logo-filename').text(sanitizedFilename);
    $('#company-logo-download').attr('download', sanitizedFilename);
});