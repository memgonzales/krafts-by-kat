$(document).ready(function() {
    $('.order-item-price').each(function() {
        $(this).text(formatNumber($(this).text()));
    });

    $('.remove-order-item').each(function() {
        $(this).on('click', function() {
            const orderItemId = getOrderItemId(this);

            hideProduct(orderItemId);
            trackRemovedOrderItems(orderItemId);
        });
    });

    $('.item-quantity').each(function() {
        $(this).on('change', function() {
            const orderItemId = getOrderItemId(this);
            const unitPrice = $('#product-price-' + orderItemId).text();
            const totalPrice = parseFloat(unitPrice) * parseFloat($(this).val());

            $('#order-item-price-' + orderItemId).text(formatNumber(totalPrice));
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

    function getOrderItemId(element) {
        const id = element.id;
        const idTokens = id.split('-');
        
        return idTokens[idTokens.length - 1];
    }

    function formatNumber(price) {
        return parseFloat(price).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    }

    function hideProduct(orderItemId) {
        $('#accordion-item-' + orderItemId).hide();
    }

    function trackRemovedOrderItems(orderItemId) {
        $('#removed-order-items').val($('#removed-order-items').val() + ',' + orderItemId);
    }

    function updateTotal(orderItemId) {
        const price = $('#order-item-price-' + orderItemId).text();
        alert(price);
    }

    $('#add-cart').on('click', function(e) {
        e.preventDefault();

		$.ajax({
			url: '/postSaveOrder',
			method: 'POST',
			data: $('#order-form').serialize(),
            statusCode: {
				200: function(data) {
                    location.href = '/';
				}
			}
		});
    });

    $('#delivery-mode-pickup').on('click', function() {
        $('#delivery-mode-value').val('pickup');
    });

    $('#delivery-mode-delivery').on('click', function() {
        $('#delivery-mode-value').val('delivery');
    });

    $('#save-order').on('click', function(e) {
        e.preventDefault();

		$.ajax({
			url: '/postSaveOrder',
			method: 'POST',
			data: $('#order-form').serialize(),
            statusCode: {
				200: function(data) {
                    location.href = '/getOrder/' + data;
				}
			}
		});
    });
})