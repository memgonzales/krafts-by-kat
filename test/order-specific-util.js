const hideProduct = function(productId) {
    $('#accordion-item-' + productId).hide();
}

module.exports = {
    hideProduct
}