$(document).ready(function() {
    /* Format the numbers to use commas to separate groups of three digits. */
    formatNumber('#units-sold');
    formatNumber('#units-available');
    formatNumber('#product-price-num');

    /* Load the pictures onto the front-end */
    const pictures = getPictures();
    displayPictures();
    emphasizePicture();

    /**
     * Formats the number given the ID of its HTML container so that commas are used to separate groups
     * of three digits
     * 
     * @param id ID of the HTML element containing the number to be formatted
     */
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

    /**
     * Returns an array containing the file paths to the product photos loaded from the database
     * 
     * @return  array containing the file paths to the product photos loaded from the database
     */
    function getPictures() {
        const pathsString = $('#picturePaths').text();
        const paths = pathsString.split(',');

        return paths;
    }

    /**
     * Displays the product photos retrieved from the database on the front-end
     */
    function displayPictures() {
        /* Refers to the maximum number of product photos that can be uploaded (and viewed) */
        const numPics = $('#small-view-pic-container').children().length;
        
        /* Use this placeholder image used when the user did not upload a photo */
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

        /* Handle the case when the user uploaded less than the maximum */
        const indexRemoveImg = pictures.length + 1;
        for (let i = indexRemoveImg; i <= numPics; i++) {
            /* Hide the placeholders and center the loaded images */
            $('#img' + i).remove();
        }
    }

    /**
     * Projects the image clicked as the largest picture displayed in the gallery
     */
    function emphasizePicture() {
        /* Use one-based indexing to follow the ID convention in the HTML file */
        for (let i = 1; i <= pictures.length; i++) {
            $('#pic' + i).on('click', function(e) {
                /* Set the largest picture to the image clicked */
                $('#pic-big').attr('src', $('#pic' + i).attr('src'))
            });
        }
    }
});