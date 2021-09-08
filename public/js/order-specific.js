$(document).ready(function() {
    $('.remove-order-item').each(function() {
        $(this).on('click', function() {
            const id = $(this).attr('id');
            const idTokens = id.split('-');
            const productId = idTokens[idTokens.length - 1];

            hideProduct(productId);
        });
    });

    function hideProduct(productId) {
        $('#accordion-item-' + productId).hide();
    }

    /* Ajax for removing an order item from a client's order */
	$('#remove-order-item-form').on('submit', function(e) {		
		e.preventDefault();
			
		$.ajax({
			url: '/postRemoveOrderItem',
			method: 'POST',
			data: $('#remove-order-item-form').serialize(),
            statusCode: {
				200: function(data) {
					location.href = '/getOrder/' + data;
				}
			}
		});
	});
})