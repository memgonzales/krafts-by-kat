$(document).ready(function() {
    /* Show warning if navigating away from page */
	window.onbeforeunload = function() {
		return true;
	};


    /* Set the hidden input pertaining to the total price of the order right when the page is loaded */
    $('#order-total-price').val(unformatNumber($('#order-total-price-display').text()));

    $('body').on('DOMSubtreeModified', '#order-total-price-display', function() {
        /*
         * It is important to "unformat" (remove the commas) the number to prevent 
         * data type issues with Mongoose.
         */
        $('#order-total-price').val(unformatNumber($('#order-total-price-display').text()));
    });

    const orderItemIdsStr = $('#order-item-id-list').text();
    const orderItemIds = getOrderItemIds(orderItemIdsStr)

    for (let orderItemId of orderItemIds) {
        updateOrderSummary(orderItemId);
    }

    function unformatNumber(price) {
        return price.replace(',', '');
    }

    function getOrderItemIds(orderItemIdsStr) {
        return orderItemIdsStr.split(',');
    }

    function updateOrderSummary(orderItemId) {
        $('#order-summary-item-quantity-' + orderItemId).text($('#quantity-' + orderItemId).val());
        $('#order-summary-item-price-' + orderItemId).text($('#order-item-price-' + orderItemId).text());
    }
})