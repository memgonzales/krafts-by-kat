const hideProduct = function(orderItemId) {
    $('#accordion-item-' + orderItemId).hide();
}

const trackRemovedOrderItems = function(orderItemId) {
    $('#removed-order-items').val($('#removed-order-items').val() + ',' + orderItemId);
}

module.exports = {
    hideProduct,
    trackRemovedOrderItems
}