/* JavaScript file for handling the front end of the landing page "polaroid" elements 
 * (i.e., the catalog item displays) 
 */

$(document).ready(function() {
    $('.carousel-inner').each(function() {
        /* Set the first photo in the carousel to active */
        $(this).children(':first').addClass('active');
    });

    /* Use commas to separate groups of three digits in prices */
    $('.price').each(function() {
        const commaPrice = parseFloat($(this).text()).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
        $(this).text(commaPrice);
    })
});