$(document).ready(function() {
    $('.remove-order-item').each(function() {
        $(this).on('click', function() {
            const id = $(this).attr('id');
            const idTokens = id.split('-');
            const productId = idTokens[idTokens.length - 1];

            hideProduct(productId);
        });
    });

    function hideProduct(productId) {
        $('#accordion-item-' + productId).hide();
    }
})