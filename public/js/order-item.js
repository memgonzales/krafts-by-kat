$(document).ready(function() {
    $('.order-name').each(function() {
        const id = getOrderItemId(this);
        const status = $('#order-status-' + id).text();

        switch(status) {
            case 'Pending':
                $('#order-div-' + id).css('background-color', '#FDFD96');
                break;
            case 'Accepted':
                $('#order-div-' + id).css('background-color', '#CFF0CC');
                break;
            case 'En Route':
                $('#order-div-' + id).css('background-color', '#E6D1F2');
                break;
            case 'Delivered':
                $('#order-div-' + id).css('background-color', '#C7D9FE');
                break;
        }
    });

    function getOrderItemId(element) {
        const id = element.id;
        const idTokens = id.split('-');
        
        return idTokens[idTokens.length - 1];
    }

});