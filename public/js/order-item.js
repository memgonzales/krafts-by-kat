/* JavaScript file for handling the front end of the order item elements */

$(document).ready(function() {
    $('.order-name').each(function() {
        const id = getOrderItemId(this);
        const status = $('#order-js-status-' + id).val();

        /* Change the background colors and redirect links when a user clicks on an order name 
         * depending on the status of the order 
         */
        switch(status) {
            case 'Pending':
                $('#order-div-' + id).css('background-color', '#FDFD96');
                $('#order-link-' + id).attr('href', '/viewSubmittedOrder/' + id);
                break;
            case 'Accepted':
                $('#order-div-' + id).css('background-color', '#CFF0CC');
                $('#order-link-' + id).attr('href', '/viewSubmittedOrder/' + id);
                break;
            case 'En Route':
                $('#order-div-' + id).css('background-color', '#E6D1F2');
                $('#order-link-' + id).attr('href', '/viewSubmittedOrder/' + id);
                break;
            case 'Delivered':
                $('#order-div-' + id).css('background-color', '#C7D9FE');
                $('#order-link-' + id).attr('href', '/viewSubmittedOrder/' + id);
                break;
            case 'Unsubmitted':
                $('#order-link-' + id).attr('href', '/viewSubmittedOrder/' + id);
                break;
            case 'Cancelled':
                $('#order-link-' + id).attr('href', '/viewSubmittedOrder/' + id);
                break;
            case 'Current':
                $('#order-link-' + id).attr('href', '/getOrder/' + id);
                break;
            default:
                break;
        }
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

});