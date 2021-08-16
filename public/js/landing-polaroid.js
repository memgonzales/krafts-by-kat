$(document).ready(function() {
    $('.carousel-inner').each(function() {
        /* Set the first photo in the carousel to active */
        $(this).children(':first').addClass('active');
    });

    /* Use comma to separate groups of three digits in prices */
    $('.price').each(function() {
        const commaPrice = parseFloat($(this).text()).toLocaleString('en-US', {maximumFractionDigits: 2});
        $(this).text(commaPrice);
    })
});