$(document).ready(function() {
    $('.remove-order-item').each(function() {
        $(this).on('click', function() {
            const id = $(this).attr('id');
            const idTokens = id.split('-');
            const orderItemId = idTokens[idTokens.length - 1];

            hideProduct(orderItemId);
            trackRemovedOrderItems(orderItemId);
        });
    });

    function hideProduct(orderItemId) {
        $('#accordion-item-' + orderItemId).hide();
    }

    function trackRemovedOrderItems(orderItemId) {
        $('#removed-order-items').val($('#removed-order-items').val() + ',' + orderItemId);
    }

    $('#save-order').on('click', function(e) {
        e.preventDefault();

		$.ajax({
			url: '/postSaveOrder',
			method: 'POST',
			data: $('#order-form').serialize(),
            statusCode: {
				200: function(data) {
                    // location.href = '/getOrder/' + data;
				}
			}
		});
    });
})