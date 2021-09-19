/* JavaScript file for handling the front end of the product manager elements */

$(document).ready(function() {
    /* Format the item prices, item ratings, and the numbers of items sold */
    formatNumber('.item-prices');
    formatNumber('.item-ratings');
    formatNumber('.item-sold');

    /**
     * Passes the input to another function to be formatted as text
     * 
     * @param classname class name of the element to be formatted
     */
    function formatNumber(className) {
        $(className).each(function() {
            let number = $(this).text();
            formatNumberIDText(className, this, number);
        });
    }

    /**
     * Format the passed element to be displayed as text
     * 
     * @param classname class name of the element to be formatted
     * @param object container of the element to be formatted
     * @param number element to be formatted
     */
    function formatNumberIDText(className, object, number) {
        let formatted = '';

        /* Display all passed numbers with two decimal places */
        if (number) {
            if (className == '.item-prices') {
                formatted = number.substr(1);
                formatted = parseFloat(formatted.trim()).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
            } else {
                formatted = parseFloat(number.trim()).toLocaleString('en-US', {maximumFractionDigits: 0});
            }
    
        }

        /* Add the peso sign to the display of item prices */
        if (className == '.item-prices') {
            formatted = '₱' + formatted;
        }

        /* Set the formatted string as the content of its pertinent container */
        $(object).text(formatted);
    }

});