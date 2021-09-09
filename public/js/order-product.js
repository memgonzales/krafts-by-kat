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

    /* Restrict date to today onwards */
    const today = new Date();
    $('#orderID_prefDate').attr('min', formatDate(today.toString()));

    /* Reflect fetched data about preferred delivery date */
    $('#orderID_prefDate').val(formatDate($('#pref_date').text()));

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

    /* Reflect fetched data about delivery mode */
    const deliveryModeData = $('#delivery-mode-data').text();
    
    switch(deliveryModeData) {
        case 'pickup':
            $('#pickup').attr('checked', true);
            break;
        case 'delivery':
            $('#delivery').attr('checked', true);
            break;
        default:
            $('#pickup').attr('checked', true);
            break;
    }

    /* Transfer input about delivery mode */
    $('.delivery-mode-radio').each(function() {
        $(this).on('change', function() {
            const data = $(this).val();

            switch(data) {
                case 'pickup':
                    $('#delivery-mode-value').val('pickup');
                    break;
                case 'delivery':
                    $('#delivery-mode-value').val('delivery');
                    break;
            }
        });
    });

    /* Reflect fetched data about payment type */
    const paymentTypeData = $('#payment-type-data').text();

    switch(paymentTypeData) {
        case 'cash':
            $('#payment-type').val('cash');
            break;
        case 'gcash':
            $('#payment-type').val('gcash');
            break;
        case 'bank_transfer':
            $('#payment-type').val('bank_transfer');
            break;
        default:
            $('#payment-type').val('cash');
            break; 
    }


    $('#cancel-order').on('click', function(e) {
        window.onbeforeunload = function() {
            return null;
        };
    });

    function formatDate(date) {
        if (date.length > 0) {
            var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();
        
            if (month.length < 2) {
                month = '0' + month;
            }

            if (day.length < 2) {
                day = '0' + day;
            }
        
            return [year, month, day].join('-');
        } else {
            return '';
        }
    }
})