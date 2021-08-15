$(document).ready(function() {
    $('.carousel-inner').each(function() {
        /* Set the first photo in the carousel to active */
        $(this).children(':first').addClass('active');
    });
});