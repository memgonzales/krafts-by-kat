const getOrderItemId = function(element) {
    const id = element.id;
    const idTokens = id.split('-');
    
    return idTokens[idTokens.length - 1];
}

const formatNumber = function(price) {
    return parseFloat(price).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
}

const hideProduct = function(orderItemId) {
    $('#accordion-item-' + orderItemId).hide();
}

const trackRemovedOrderItems = function(orderItemId) {
    $('#removed-order-items').val($('#removed-order-items').val() + ',' + orderItemId);
}

const updateTotal = function(orderItemId) {
    const price = $('#order-item-price-' + orderItemId).text();
    alert(price);
}

module.exports = {
    getOrderItemId,
    formatNumber,
    hideProduct,
    trackRemovedOrderItems,
    updateTotal
}