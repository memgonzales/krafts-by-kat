$(document).ready(function() {
    /* Hide add to order button if viewing using an admin account */
    hideAddToOrder();

    /* Format the numbers to use commas to separate groups of three digits. */
    formatNumber('#units-sold');
    formatNumber('#units-available');
    formatNumber('#product-price');

    /* Use this placeholder image used when the user did not upload a photo */
    const placeholder = '/img/placeholder/no-image.png';

    /* Load the pictures onto the front-end */
    const pictures = getPictures($('#picturePaths').text());
    displayPictures(pictures, placeholder);
    emphasizeOnLoad(pictures, placeholder);
    emphasizePicture();

    /**
     * Formats the number given the ID of its HTML container so that commas are used to separate groups
     * of three digits
     * 
     * @param id ID of the HTML element containing the number to be formatted
     */
    function formatNumber(id) {
        let number = $(id).text();
        $(id).text(formatNumberIDText(id, number));
    }

    function formatNumberIDText(id, number) {
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

    function hideAddToOrder() {
        const hide = $('#is-admin').text().trim();

        if (hide == 'true') {
            $('#add-to-order').hide();
        }
    }

    /**
     * Returns an array containing the file paths to the product photos loaded from the database
     * 
     * @return  array containing the file paths to the product photos loaded from the database
     */
    function getPictures(pathsString) {
        const paths = pathsString.split(',');
        return paths;
    }

    /**
     * Displays the product photos retrieved from the database on the front-end
     */
    function displayPictures(pictures, placeholder) {
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

    /**
     * Add border around the first image when the page is loaded since it is the largest picture
     * displayed in the gallery by default
     */
    function emphasizeOnLoad(pictures, placeholder) {
        /* Do not place a border if no product photo was uploaded */
        if (!isPlaceholder(pictures, placeholder)) {
            $('#img1').css('background-color', '#E5D1B8');
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
                $('#pic-big').attr('src', $('#pic' + i).attr('src'));

                /* Only the clicked (and projected) photo should have a border */
                for (j = 1; j <= pictures.length; j++) {
                    $('#img' + j).css('background-color', '#2b2129');
                }

                $('#img' + i).css('background-color', '#E5D1B8');
            });
        }
    }

    function isPlaceholder(pictures, placeholder) {
        return pictures[0] == placeholder;
    }
});