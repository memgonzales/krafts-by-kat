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
        return price.replace(/,/g, '');;
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

    /* Update company logo based on file uploaded */
    $('#company-logo').on('change', function() {
        readURL(this);
    });

    $('#save-order').on('click', function(e) {
        e.preventDefault();

        if ($('#order-name').val().trim() == '') {
            alert('Please enter an order name');
            document.documentElement.scrollTop = 0;
        } else {
            $.ajax({
                url: '/postSaveOrder',
                method: 'POST',
                data: new FormData(document.getElementById('order-form')),
                processData: false,
                contentType: false,
                statusCode: {
                    200: function(data) {
                        window.onbeforeunload = null;
                        window.location.href = '/account/myOrders';
                    }
                }
            });
        }
    });

    $('#place-order').on('click', function(e) {
        e.preventDefault();
        
        if ($('#order-name').val().trim() == '') {
            alert('Please enter an order name');
            document.documentElement.scrollTop = 0;
        } else {
            $.ajax({
                url: '/postPlaceOrder',
                method: 'POST',
                data: new FormData(document.getElementById('order-form')),
                processData: false,
                contentType: false,
                statusCode: {
                    200: function(data) {
                        window.onbeforeunload = null;
                    }
                }
            });
        }
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

    function readURL(input) {
        /* Get the file extension using regex */
		let extension = input.value.match(/\.([^\.]+)$/)[1];
		let isImage = imgFilter(extension.toLowerCase());

		/* The uploaded file is recognized as a valid image file type */
		if (isImage) {
			if (input.files && input.files[0]) {
				let reader = new FileReader();
				reader.onload = function(e) {
					$('#company-logo-img').attr('src', e.target.result);
				}
				
				reader.readAsDataURL(input.files[0]);
			}
		} else {
			/* The uploaded file is not recognized as a valid image file type */
			input.value = '';
		}
    }

    /**
	 * Prevents the uploading of non-image files on the client-side by displaying an alert
	 * 
	 * @param extension extension of the file uploaded (all letters in lowercase)
	 */
	function imgFilter(extension) {
		switch(extension) {
			/* Fall through in all cases is deliberate */
			case 'jpg':
			case 'jpeg':
			case 'jpe':
			case 'jfif':
			case 'heic':
			case 'png':
			case 'gif':
			case 'webp':
			case 'bmp':
			case 'svg':
				return true;
			default:
				alert('This file type is not supported. Please upload a valid image.');
				return false;
		}
	}
})