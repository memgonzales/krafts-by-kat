const hideProduct = function(orderItemId) {
    $('#accordion-item-' + orderItemId).hide();
}

module.exports = {
    hideProduct
}