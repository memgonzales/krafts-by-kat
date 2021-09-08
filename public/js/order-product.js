$(document).ready(function() {
    $('body').on('DOMSubtreeModified', '#order-total-price-display', function(){
        $('#order-total-price').val($('#order-total-price-display').text());
    });

    $('#boop').on('click', function() {
        $('#order-total-price-display').text(Math.random());
    });
})