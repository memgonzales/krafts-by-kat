$(document).ready(function() {
    $('.remove-order-item').each(function() {
        $(this).on('click', function() {
            const id = $(this).attr('id');
            const idTokens = id.split('-');
            const orderItemId = idTokens[idTokens.length - 1];

            hideProduct(orderItemId);
            trackRemovedOrderItems(orderItemId);
        });
    });

    function hideProduct(orderItemId) {
        $('#accordion-item-' + orderItemId).hide();
    }

    function trackRemovedOrderItems(orderItemId) {
        $('#removed-order-items').val($('#removed-order-items').val() + ',' + orderItemId);
    }
})