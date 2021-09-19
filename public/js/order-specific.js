/* JavaScript file for handling the front end of the order item text fields on the get order page */

$(document).ready(function() {
    const orderItemIdsStr = $('#order-item-id-list').text();
    const orderItemIds = getOrderItemIds(orderItemIdsStr)

    /* Format the order item prices */
    $('.order-item-price').each(function() {
        $(this).text(formatNumber($(this).text()));
    });

    /* Update the front end when an order item is removed */
    $('.remove-order-item').each(function() {
        $(this).on('click', function() {
            const orderItemId = getOrderItemId(this);

            hideProduct(orderItemId);
            trackRemovedOrderItems(orderItemId);
            removeProductFromSummary(orderItemId);
        });
    });

    /* Update the order item prices on page load */
    $('.item-quantity').each(function() {
        const orderItemId = getOrderItemId(this);
        const unitPrice = $('#product-price-' + orderItemId).text();
        const totalPrice = parseFloat(unitPrice) * parseFloat($(this).val());

        $('#order-item-price-' + orderItemId).text(formatNumber(totalPrice));
        $('#order-item-price-hidden-' + orderItemId).val(totalPrice);
    });

    /* Update the order item prices when the quantity changes */
    $('.item-quantity').each(function() {
        $(this).on('change', function() {
            const orderItemId = getOrderItemId(this);
            const unitPrice = $('#product-price-' + orderItemId).text();
            const totalPrice = parseFloat(unitPrice) * parseFloat($(this).val());

            $('#order-item-price-' + orderItemId).text(formatNumber(totalPrice));
            $('#order-item-price-hidden-' + orderItemId).val(totalPrice);

            updateOrderSummary(orderItemId);
        });
    });

    $('.item-quantity').each(function() {
        $(this).on('input', function() {
            const orderItemId = getOrderItemId(this);
            const productItemId = $('#product-' + orderItemId).val();

            /* Get the total number of ordered quantities for all items that are of the same product */
            let totalOrdered = 0;
            $('.product-quantity-' + productItemId).each(function() {
                totalOrdered += parseInt($(this).val());
            });          

            /* Handle the case where the user orders more than the available amount */
            if (totalOrdered > parseInt($(this).attr('max'))) {
                const excess = totalOrdered - parseInt($(this).attr('max'));
                const left = $(this).val() - excess
                $(this).val(left);
                $('#quantity-exceed-' + orderItemId).text('Only ' + left + ' more units are available');

            /* Handle the case where the user orders less than one item */
            } else if (parseInt($(this).val()) < parseInt($(this).attr('min'))) {
                $(this).val($(this).attr('min'));
                $('#quantity-exceed-' + orderItemId).text('You have to order at least one item');
            } else {
                $('#quantity-exceed-' + orderItemId).text('');
            }
        });
    });

    /* Reflect fetched data about packaging */
    $('.packaging-data').each(function() {
        const orderItemId = getOrderItemId(this);
        const data = $(this).text();

        switch (data) {
            case 'kraft_box':
                $('#packaging_kraft_box-' + orderItemId).attr('checked', true);
                break;
            case 'mailer_box':
                $('#packaging_mailer_box-' + orderItemId).attr('checked', true);
                break;
            case 'silk_pouch':
                $('#packaging_silk_pouch-' + orderItemId).attr('checked', true);
                break;
            case 'packaging_canvas':
                $('#packaging_canvas-' + orderItemId).attr('checked', true);
                break;
            default:
                break;
        }
    });

    /* Transfer input about packaging to hidden text field */
    $('.packaging-radio').each(function() {
        $(this).on('change', function() {
            const orderItemId = getOrderItemId(this);
            const data = $(this).val();

            $('#packaging-type-' + orderItemId).val(data);
        })
    });

    /* Reflect fetched data about inclusion of company logo */
    $('.company-logo-data').each(function() {
        const orderItemId = getOrderItemId(this);
        const data = $(this).text();

        switch (data) {
            case 'true':
                $('#logo_with-' + orderItemId).attr('checked', true);
                break;
            case 'false':
                $('#logo_without-' + orderItemId).attr('checked', true);
                break;
            default:
                break;
        }
    });

    /* Transfer input about inclusion of company logo to hidden text field */
    $('.company-logo-radio').each(function() {
        $(this).on('change', function() {
            const orderItemId = getOrderItemId(this);
            const data = $(this).val();

            $('#company-logo-' + orderItemId).val(data);

            /* Control display of checklist about location of logo */
            switch(data) {
                case 'true':
                    $('#logo-location-div-' + orderItemId).show();
                    break;
                case 'false':
                    $('#logo-location-div-' + orderItemId).hide();
                    break;
            }
        })
    });

    /* Control display of checklist when the page loads */
    $('.logo-location-div').each(function() {
        const orderItemId = getOrderItemId(this);

        /* Control display of checklist about location of logo */
        if ($('#company-logo-' + orderItemId).val() == 'true') {
            $('#logo-location-div-' + orderItemId).show();
        } else {
            $('#logo-location-div-' + orderItemId).hide();
        }
    });

    /* Update the price per order item in the payment overview. */
    for (let orderItemId of orderItemIds) {
        updateOrderSummary(orderItemId);
        if (isNaN(getOrderTotalPrice())) {
            $('#order-total-price-display').text(formatNumber('0'));
        }
    }

    /* Reflect fetched data about packaging color */
    $('.packaging-color').each(function() {
        const orderItemId = getOrderItemId(this);
        const data = $(this).text();

        if (data == '') {
            $('#packaging-color-select-' + orderItemId).val('packaging_color_1');
        } else {
            $('#packaging-color-select-' + orderItemId).val(data);
        }
        
    });

    /* Reflect fetched data about item color */
    $('.item-color').each(function() {
        const orderItemId = getOrderItemId(this);
        const data = $(this).text();

        if (data == '') {
            $('#item-color-select-' + orderItemId).val('item_color_1');
        } else {
            $('#item-color-select-' + orderItemId).val(data);
        }
        
    });

    /* Reflect fetched data about location of company logo */
    $('.company-logo-location-data').each(function() {
        const orderItemId = getOrderItemId(this);
        const data = $(this).text();
        
        switch(data) {
            case '':
                $('#logo_on_items-' + orderItemId).prop('checked', false);
                $('#logo_on_packaging-' + orderItemId).prop('checked', false);
                break;
            case 'items,packaging':
                $('#logo_on_items-' + orderItemId).prop('checked', true);
                $('#logo_on_packaging-' + orderItemId).prop('checked', true);
                break;
            case 'items':
                $('#logo_on_items-' + orderItemId).prop('checked', true);
                $('#logo_on_packaging-' + orderItemId).prop('checked', false);
                break;
            case 'packaging':
                $('#logo_on_items-' + orderItemId).prop('checked', false);
                $('#logo_on_packaging-' + orderItemId).prop('checked', true);
                break;
        }
    });

    /* Transfer input about location of company logo onto the hidden input field */
    $('.items-checkbox').each(function() {
        $(this).on('change', function() {
            const orderItemId = getOrderItemId(this);
            const itemsChecked = $('#logo_on_items-' + orderItemId).prop('checked');
            const packagingChecked = $('#logo_on_packaging-' + orderItemId).prop('checked');

            if (itemsChecked && packagingChecked) {
                $('#logo-location-' + orderItemId).val('items|packaging');
            } else if (itemsChecked && !packagingChecked) {
                $('#logo-location-' + orderItemId).val('items');
            } else if (!itemsChecked && packagingChecked) {
                $('#logo-location-' + orderItemId).val('packaging');
            } else {
                $('#logo-location-' + orderItemId).val('');
            }
        });
    });

    $('.packaging-checkbox').each(function() {
        $(this).on('change', function() {
            const orderItemId = getOrderItemId(this);
            const itemsChecked = $('#logo_on_items-' + orderItemId).prop('checked');
            const packagingChecked = $('#logo_on_packaging-' + orderItemId).prop('checked');

            if (itemsChecked && packagingChecked) {
                $('#logo-location-' + orderItemId).val('items|packaging');
            } else if (itemsChecked && !packagingChecked) {
                $('#logo-location-' + orderItemId).val('items');
            } else if (!itemsChecked && packagingChecked) {
                $('#logo-location-' + orderItemId).val('packaging');
            } else {
                $('#logo-location-' + orderItemId).val('');
            }
        });
    });

    /**
	 * Retrieve the ObjectID of an order or order item
	 * 
	 * @param element element whose ObjectID is to be retrieved
     * @return string representation of the ObjectID of the passed element
	 */
    function getOrderItemId(element) {
        const id = element.id;
        const idTokens = id.split('-');
        
        return idTokens[idTokens.length - 1];
    }

    /**
	 * Add commas to the order item price
	 * 
	 * @param price price to be formatted
     * @return formatted version of the price with commas added 
	 */
    function formatNumber(price) {
        return parseFloat(price).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    }

    /**
	 * Remove commas from the order item price
	 * 
	 * @param price price to be unformatted
     * @return unformatted version of the price with commas removed
	 */
    function unformatNumber(price) {
        return price.replace(/,/g, '');;
    }

    /**
	 * Hide the front end elements of a removed order item
	 * 
	 * @param orderItemId ID of the order item that was removed
	 */
    function hideProduct(orderItemId) {
        $('#accordion-item-' + orderItemId).hide();
    }

    /**
	 * Update the list of removed order items
	 * 
	 * @param orderItemId ID of the order item that was removed
	 */
    function trackRemovedOrderItems(orderItemId) {
        $('#removed-order-items').val($('#removed-order-items').val() + ',' + orderItemId);
    }

    /**
	 * Update the quantities and subtotals of an order item and the total price
	 * 
	 * @param orderItemId ID of the order item whose details are to be updated
	 */
    function updateOrderSummary(orderItemId) {
        $('#order-summary-item-quantity-' + orderItemId).text($('#quantity-' + orderItemId).val());
        $('#order-summary-item-price-' + orderItemId).text($('#order-item-price-' + orderItemId).text());

        $('#order-total-price-display').text(formatNumber(getOrderTotalPrice()));
    }

    /**
	 * Retrieve the total price of the order
	 * 
	 * @return the total price of the order
	 */
    function getOrderTotalPrice() {
        let total = 0;
        for (let orderItemId of orderItemIds) {
            total += parseFloat(unformatNumber($('#order-item-price-' + orderItemId).text()));
        }

        return total;
    }

    /**
	 * Retrieve the ObjectID of an order or order item
	 * 
	 * @param element element whose ObjectID is to be retrieved
     * @return string representation of the ObjectID of the passed element
	 */
    function getOrderItemIds(orderItemIdsStr) {
        return orderItemIdsStr.split(',');
    }

    /**
	 * Remove the front end elements of a removed order item from the order summary
	 * 
	 * @param orderItemId ID of the order item that was removed
	 */
    function removeProductFromSummary(orderItemId) {
        const priceRemoved = parseFloat(unformatNumber($('#order-summary-item-price-' + orderItemId).text()));
        const total = parseFloat(unformatNumber($('#order-total-price-display').text()));

        $('#order-summary-item-' + orderItemId).remove();
        $('#order-total-price-display').text(formatNumber(total - priceRemoved));
    }
})