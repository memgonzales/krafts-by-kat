$(document).ready(function() {
    formatNumber('#units-sold');
    formatNumber('#units-available');
    formatNumber('#product-price-num');

    const pictures = getPictures();
    displayPictures();

    function formatNumber(id) {
        let number = $(id).text();
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

        $(id).text(formatted);
    }

    function getPictures() {
        const pathsString = $('#picturePaths').text();
        const paths = pathsString.split(',');

        return paths;
    }

    function displayPictures() {
        const numPics = $('#small-view-pic-container').children().length;
        
        const placeholder = '/img/placeholder/no-image.png';

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

        const indexRemoveImg = pictures.length + 1;
        for (let i = indexRemoveImg; i <= numPics; i++) {
            $('#img' + i).remove();
        }
    }
});