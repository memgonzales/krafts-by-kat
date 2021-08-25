$(document).ready(function() {
    /* Format the numbers to use commas to separate groups of three digits. */
    formatNumber('#units-sold');
    formatNumber('#units-available');
    formatNumber('#product-price-num');

    /* Load the pictures onto the front-end */
    const pictures = getPictures();
    displayPictures();

    /* The maximum number of pictures is the number of children of the div with the id below. */
    const maxNumPictures = $('#small-view-pic-container').children().length;

    /* 
	 * Initialize an array to store the image file paths.
	 * 
	 * Place empty strings (corresponding to the maximum number of allowable pictures in the polaroid)
	 * to handle the case that the user does not upload the pictures on consecutive file input fields.
	 */
	let imgTargetResultsOrig = [];
	for (let i = 0; i < maxNumPictures; i++) {
		imgTargetResultsOrig.push('');
	}

    /**
     * Formats the number given the ID of its HTML container so that commas are used to separate groups
     * of three digits
     * 
     * @param id ID of the HTML element containing the number to be formatted
     */
    function formatNumber(id) {
        let number = $(id).text();
        let formatted = '';

        /* Add a null safety check */
        if (number) {
            /* Ignore the peso sign */
            if (id == '#product-price-num') {
                formatted = number.substr(1);
                formatted = parseFloat(formatted.trim()).toLocaleString('en-US', {maximumFractionDigits: 2});
            } else {
                formatted = parseFloat(number.trim()).toLocaleString('en-US', {maximumFractionDigits: 2});
            }
    
        }

        /* Affix the peso sign */
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
        /* A comma is used to delimit the file paths */
        const paths = pathsString.split(',');

        return paths;
    }

    /**
     * Displays the product photos retrieved from the database on the front-end
     */
    function displayPictures() {
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
    }

    /** 
	 * Open the file explorer for uploading images when an image placeholder is clicked
	 */
	function triggerUpload() {
		for (let i = 1; i <= maxNumPictures; i++) {
			$('#img-' + i).on('click', function() {
				$('#product-img-' + i).click();
			});	

			$('#pic-' + i).on('click', function() {
				$('#product-img-'  + i).click();
			});
		}
	}
});