$(document).ready(function() {
    const orderItemIdsStr = $('#order-item-id-list').text();
    const orderItemIds = getOrderItemIds(orderItemIdsStr)

    $('.order-item-price').each(function() {
        $(this).text(formatNumber($(this).text()));
    });

    $('.remove-order-item').each(function() {
        $(this).on('click', function() {
            const orderItemId = getOrderItemId(this);

            hideProduct(orderItemId);
            trackRemovedOrderItems(orderItemId);
            removeProductFromSummary(orderItemId);
        });
    });

    $('.item-quantity').each(function() {
        $(this).on('change', function() {
            const orderItemId = getOrderItemId(this);
            const unitPrice = $('#product-price-' + orderItemId).text();
            const totalPrice = parseFloat(unitPrice) * parseFloat($(this).val());

            $('#order-item-price-' + orderItemId).text(formatNumber(totalPrice));

            updateOrderSummary(orderItemId);
        });
    });

    $('.item-quantity').each(function() {
        $(this).on('input', function() {
            const orderItemId = getOrderItemId(this);

            if (parseInt($(this).val()) > parseInt($(this).attr('max'))) {
                $(this).val($(this).attr('max'));
                $('#quantity-exceed-' + orderItemId).text('We only have ' + $(this).attr('max') + ' units available');
            } else {
                $('#quantity-exceed-' + orderItemId).text('');
            }
        });
    });

    /* Update the price per order item in the payment overview. */
    for (let orderItemId of orderItemIds) {
        updateOrderSummary(orderItemId);
        if (isNaN(getOrderTotalPrice())) {
            $('#order-total-price-display').text(formatNumber('0'));
        }
    }

    function getOrderItemId(element) {
        const id = element.id;
        const idTokens = id.split('-');
        
        return idTokens[idTokens.length - 1];
    }

    function formatNumber(price) {
        return parseFloat(price).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    }

    function unformatNumber(price) {
        return price.replace(',', '');
    }

    function hideProduct(orderItemId) {
        $('#accordion-item-' + orderItemId).hide();
    }

    function trackRemovedOrderItems(orderItemId) {
        $('#removed-order-items').val($('#removed-order-items').val() + ',' + orderItemId);
    }

    function updateOrderSummary(orderItemId) {
        $('#order-summary-item-quantity-' + orderItemId).text($('#quantity-' + orderItemId).val());
        $('#order-summary-item-price-' + orderItemId).text($('#order-item-price-' + orderItemId).text());

        $('#order-total-price-display').text(formatNumber(getOrderTotalPrice()));
    }

    function getOrderTotalPrice() {
        let total = 0;
        for (let orderItemId of orderItemIds) {
            total += parseFloat(unformatNumber($('#order-item-price-' + orderItemId).text()));
        }

        return total;
    }

    function getOrderItemIds(orderItemIdsStr) {
        return orderItemIdsStr.split(',');
    }

    function removeProductFromSummary(orderItemId) {
        const priceRemoved = parseFloat($('#order-summary-item-price-' + orderItemId).text());
        const total = parseFloat($('#order-total-price-display').text());

        $('#order-summary-item-' + orderItemId).remove();
        $('#order-total-price-display').text(formatNumber(total - priceRemoved));
    }
})