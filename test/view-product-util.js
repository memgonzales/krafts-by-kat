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

const formatNumberID = function(id) {
    let number = $(id).text();
    $(id).text(formatNumberIDText(id, number));
}

const hideAddToOrder = function() {
    const hide = $('#is-admin').text().trim();

    if (hide == 'true') {
        $('#add-to-order').hide();
    }
}

const getPictures = function(pathsString) {
    const paths = pathsString.split(',');
    return paths;
}

const isPlaceholder = function(pictures, placeholder) {
    return pictures[0] == placeholder;
}

const displayPictures = function(pictures, placeholder) {
    /* Refers to the maximum number of product photos that can be uploaded (and viewed) */
    const numPics = $('#small-view-pic-container').children().length;
        
    /* Display pictures only if pictures have been uploaded */
    if (!isPlaceholder(pictures, placeholder)) {
        /* Update the large picture, and set it to the first picture in the polaroid display */
        $('#pic-big').css('display', 'block');
        $('#pic-big').attr('src', pictures[0]);
        $('#icon-big').css('display', 'none');    

        /* Use one-based indexing to conform with the IDs of the HTML elements */
        for (let i = 1; i <= pictures.length; i++) {
            $('#pic' + i).css('display', 'inline-block');
            $('#icon' + i).css('display', 'none');

            /* Use zero-based indexing to conform with array notation */
            $('#pic' + i).attr('src', pictures[i - 1]);
        }
    }

    /* Handle the case when the user uploaded less than the maximum */
    const indexRemoveImg = pictures.length + 1;
    for (let i = indexRemoveImg; i <= numPics; i++) {
        /* Hide the placeholders and center the loaded images */
        $('#img' + i).remove();
    }
}

const emphasizeOnLoad = function(pictures, placeholder) {
    /* Do not place a border if no product photo was uploaded */
    if (!isPlaceholder(pictures, placeholder)) {
        $('#img1').css('background-color', '#E5D1B8');
    }
}

module.exports = {
    formatNumberIDText,
    formatNumberID,
    hideAddToOrder,
    getPictures,
    displayPictures,
    emphasizeOnLoad,
    isPlaceholder
};