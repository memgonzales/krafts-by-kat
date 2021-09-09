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
    const orderItemIds = getOrderItemIds(orderItemIdsStr);

    $('#order-total-price-display').text(formatNumber($('#order-total-price-display').text()));

    for (let orderItemId of orderItemIds) {
        $('#order-summary-item-price-' + orderItemId).text(formatNumber($('#order-summary-item-price-' + orderItemId).text()));
    }

    /* Open the accordion pertaining to the last item */
    const mostRecentOrderId = orderItemIds[orderItemIds.length - 1];
    $('#productId_collapse-' + mostRecentOrderId).addClass('show');


    function formatNumber(price) {
        return parseFloat(price).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
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

    $('#add-cart').on('click', function(e) {
        e.preventDefault();

		$.ajax({
			url: '/postSaveOrder',
			method: 'POST',
			data: new FormData(document.getElementById('order-form')),
            processData: false,
            contentType: false,
            statusCode: {
				200: function(data) {
                    window.onbeforeunload = null;
                    location.href = '/';
				}
			}
		});
    });

    $('#pickup').on('click', function() {
        $('#delivery-mode-value').val('pickup');
    });

    $('#delivery').on('click', function() {
        $('#delivery-mode-value').val('delivery');
    });

    $('#save-order').on('click', function(e) {
        e.preventDefault();
        
        $.ajax({
			url: '/postSaveOrder',
			method: 'POST',
			data: new FormData(document.getElementById('order-form')),
            processData: false,
            contentType: false,
            statusCode: {
				200: function(data) {
                    window.onbeforeunload = null;
                    location.href = '/getOrder/' + data;
				}
			}
		});
    });
})