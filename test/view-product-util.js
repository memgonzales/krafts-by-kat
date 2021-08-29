const formatNumberIDText = function(id, number) {
    let formatted = '';

    if (number) {
        if (id == '#product-price') {
            formatted = number.substr(1);
            formatted = parseFloat(formatted.trim()).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
        } else {
            formatted = parseFloat(number.trim()).toLocaleString('en-US', {maximumFractionDigits: 0});
        }

    }

    if (id == '#product-price') {
        formatted = '₱' + formatted;
    }

    return formatted;
}

module.exports = {
    formatNumberIDText
};