const formatNumberIDText = function(id, number) {
    let formatted = '';

    if (number) {
        if (id == '#product-price-num') {
            formatted = number.substr(1);
            formatted = parseFloat(formatted.trim()).toLocaleString('en-US', {maximumFractionDigits: 2});
        } else {
            formatted = parseFloat(number.trim()).toLocaleString('en-US', {maximumFractionDigits: 2});
        }

    }

    if (id == '#product-price-num') {
        formatted = '₱' + formatted;
    }

    return formatted;
}

module.exports = {
    formatNumberIDText
};