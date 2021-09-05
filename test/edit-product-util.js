const hideRemoveImg = function(pictures, placeholder, maxNumPictures) {
    /* Handle the case if the only picture is the placeholder */
    if (pictures[0] == placeholder) {
        for (let i = 1; i <= maxNumPictures; i++) {
            $('#remove-img' + i).css('visibility', 'hidden');
        }
    } else {
        for (let i = pictures.length + 1; i <= maxNumPictures; i++) {
            $('#remove-img' + i).css('visibility', 'hidden');
        }
    }
}

const formatNumberText = function(id) {
    let number = $(id).text();
    let formatted = '';

    /* Add a null safety check */
    if (number) {
        formatted = parseFloat(number.trim()).toLocaleString('en-US', {maximumFractionDigits: 0});
    }

    $(id).text(formatted);
}

const formatNumberVal = function(id) {
    let number = $(id).val();
    let formatted = '';

    /* Add a null safety check */
    if (number) {
        /* Ignore the peso sign */
        if (id == '#product-price') {
            formatted = parseFloat(number.trim()).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
        } else {
            formatted = parseFloat(number.trim()).toLocaleString('en-US', {maximumFractionDigits: 0});
        }

    }

    $(id).val(formatted);
}

const getPictures = function() {
    const pathsString = $('#picturePaths').text();
    /* A comma is used to delimit the file paths */
    const paths = pathsString.split(',');

    return paths;
}

const displayPictures = function(pictures, placeholder) {
    /* Display pictures only if pictures have been uploaded */
    if (pictures[0] != placeholder) {
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
}

const trackModifiedIndices = function(maxNumPictures) {
    /* Initialize to an empty string to prevent duplicates when editing is done repetitively */
    let modifiedIndicesStr = "";

    /* Concatenate if the photo has been modified by the user */
    for (let i = 0; i < maxNumPictures; i++) {
        if (modifiedIndices[i] == true) {
            modifiedIndicesStr += i;
        }
    }

    /* Pass to the appropriate hidden text field */
    $('#modified-indices').val(modifiedIndicesStr);
}

const trackDeletedIndices = function(maxNumPictures) {
    /* Initialize to an empty string to prevent duplicates when editing is done repetitively */
    let deletedIndicesStr = "";

    /* Concatenate if the photo has been modified by the user */
    for (let i = 0; i < maxNumPictures; i++) {
        if (deletedIndices[i] == true) {
            deletedIndicesStr += i;
        }
    }

    /* Pass to the appropriate hidden text field */
    $('#deleted-indices').val(deletedIndicesStr);
}

module.exports = {
    hideRemoveImg,
    formatNumberText,
    formatNumberVal,
    getPictures,
    displayPictures,
    trackModifiedIndices,
    trackDeletedIndices
};