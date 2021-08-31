const formatNumberIDText = function(className, object, number) {
    let formatted = '';

    if (number) {
        if (className == '.item-prices') {
            formatted = number.substr(1);
            formatted = parseFloat(formatted.trim()).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
        } else {
            formatted = parseFloat(number.trim()).toLocaleString('en-US', {maximumFractionDigits: 0});
        }

    }

    if (className == '.item-prices') {
        formatted = '₱' + formatted;
    }

    $(object).text(formatted);
}

const formatNumber = function(className) {
    $(className).each(function() {
        let number = $(this).text();
        formatNumberIDText(className, this, number);
    });
}

module.exports = {
    formatNumber,
    formatNumberIDText
}