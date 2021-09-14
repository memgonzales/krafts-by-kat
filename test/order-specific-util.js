const getOrderItemId = function(element) {
    const id = element.id;
    const idTokens = id.split('-');
    
    return idTokens[idTokens.length - 1];
}

const formatNumber = function(price) {
    return parseFloat(price).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
}

const unformatNumber = function(price) {
    return price.replace(/,/g, '');;
}

const hideProduct = function(orderItemId) {
    $('#accordion-item-' + orderItemId).hide();
}

const trackRemovedOrderItems = function(orderItemId) {
    $('#removed-order-items').val($('#removed-order-items').val() + ',' + orderItemId);
}

const updateOrderSummary = function(orderItemId) {
    $('#order-summary-item-quantity-' + orderItemId).text($('#quantity-' + orderItemId).val());
    $('#order-summary-item-price-' + orderItemId).text($('#order-item-price-' + orderItemId).text());

    $('#order-total-price-display').text(formatNumber(getOrderTotalPrice()));
}

const getOrderTotalPrice = function() {
    let total = 0;
    for (let orderItemId of orderItemIds) {
        total += parseFloat(unformatNumber($('#order-item-price-' + orderItemId).text()));
    }

    return total;
}

const getOrderItemIds = function(orderItemIdsStr) {
    return orderItemIdsStr.split(',');
}

const removeProductFromSummary = function(orderItemId) {
    const priceRemoved = parseFloat(unformatNumber($('#order-summary-item-price-' + orderItemId).text()));
    const total = parseFloat(unformatNumber($('#order-total-price-display').text()));

    $('#order-summary-item-' + orderItemId).remove();
    $('#order-total-price-display').text(formatNumber(total - priceRemoved));
}

module.exports = {
    getOrderItemId,
    formatNumber,
    unformatNumber,
    hideProduct,
    trackRemovedOrderItems,
    getOrderItemIds,
    removeProductFromSummary
}