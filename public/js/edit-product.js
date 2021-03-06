/* JavaScript file for handling the front end of the edit product page elements */

$(document).ready(function() {
    /* Show warning if navigating away from page */
    window.onbeforeunload = function() {
        return true;
    };

    /* Remove warning if submitting the form */
    $('#edit-product-form').on('submit', function() {
        window.onbeforeunload = null;
    });

    /* Use this placeholder image used when the user did not upload a photo */
    const placeholder = '/img/placeholder/no-image.png';

    /* Load the pictures onto the front-end */
    const pictures = getPictures();
    displayPictures(pictures, placeholder);

    /* The maximum number of pictures is the number of children of the div with the id below. */
    const maxNumPictures = $('#small-view-pic-container').children().length;

    /* Call the methods for uploading (editing) a picture */
    hideRemoveImg(pictures, placeholder, maxNumPictures);
    triggerUpload();
    changePicOnUpload();
    removePic();
    cancel();
	
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

    /*
     * Initialize an array to store a Boolean value corresponding to whether a photo has been edited
     *
     * Each photo is identified via a zero-based index. Initially, all of them are unmodified; thus,
     * the initial values are all set to false.
     */
    let modifiedIndices = [];
    for (let i = 0; i < maxNumPictures; i++) {
        modifiedIndices.push(false);
    }

    /**
	 * Hides the remove buttons of all the product photos
	 * 
	 * Initially, all the remove buttons are hidden from view
     * 
     * @param pictures pictures whose remove buttons are to be hidden
     * @param placeholder placeholder picture for when there are no pictures associated with the product
     * @param maxNumPictures maximum number of pictures a product can have
	 */
	function hideRemoveImg(pictures, placeholder, maxNumPictures) {
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

    /*
     * Initialize an array to store a Boolean value corresponding to whether a photo has been removed
     *
     * Each photo is identified via a zero-based index. Initially, all of them are not removed; thus,
     * the initial values are all set to false.
     */
    let deletedIndices = [];
    for (let i = 0; i < maxNumPictures; i++) {
        deletedIndices.push(false);
    }

    /** 
	 * Clears the picture fields
	 */
	function cancel() {
		$('#cancel-changes').click(function() {
			/* Redirect the user back to the prducts manager page */
			location.href = '/account/admin/productsManager';
		});
	}

    /**
     * Formats the number given the ID of its HTML container so that commas are used to separate groups
     * of three digits
     * 
     * @param id ID of the HTML element containing the number to be formatted
     */
     function formatNumberText(id) {
        let number = $(id).text();
        let formatted = '';

        /* Add a null safety check */
        if (number) {
            formatted = parseFloat(number.trim()).toLocaleString('en-US', {maximumFractionDigits: 0});
        }

        $(id).text(formatted);
    }

    /**
     * Formats the number given the ID of its HTML container so that commas are used to separate groups
     * of three digits
     * 
     * @param id ID of the HTML element containing the number to be formatted
     */
    function formatNumberVal(id) {
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
     * 
     * @param pictures pictures to be displayed
     * @param placeholder placeholder picture for when there are no pictures associated with the product
     */
    function displayPictures(pictures, placeholder) {
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
			$('#icon' + i).on('click', function() {
				$('#product-img-' + i).click();
			});	

			$('#pic' + i).on('click', function() {
				$('#product-img-'  + i).click();
			});
		}
	}

    /** 
	 * Change the display when the user uploads an image
	 */
	function changePicOnUpload() {
		for (let i = 1; i <= maxNumPictures; i++) {
			$('#product-img-' + i).on('change', function() {
				readURL(this, i);
			});
		}
	}

    /**
	 * Reads the URLs of the uploaded images to display them on the polaroid
	 * 
	 * @param input the file input field
	 * @param i the one-based index of the file input field 
	 */
	function readURL(input, i) {
		/* Get the file extension using regex */
		let extension = input.value.match(/\.([^\.]+)$/)[1];
		// let isImage = imgFilter(extension.toLowerCase());
        let isImage = true;

		/* The uploaded file is recognized as a valid image file type */
		if (isImage) {
			if (input.files && input.files[0]) {
				let reader = new FileReader();
				reader.onload = function(e) {
					$('#pic' + i).css('display', 'inline-block');
                    $('#icon' + i).css('display', 'none');

                    /* Use zero-based indexing to conform with array notation */
                    $('#pic' + i).attr('src', e.target.result)

					/* Store the image file paths in an array. Subtract 1 from index since array is zero-based. */
					imgTargetResultsOrig[i - 1] = e.target.result;

                    /* Handle the case when the first photo is changed */
                    if (i == 1) {
                        $('#pic-big').css('display', 'block');
                        $('#pic-big').attr('src', e.target.result);
                        $('#icon-big').css('display', 'none');
                    }

                    /* Display the remove photo button */
					$('#remove-img' + i).css('visibility', 'visible');

                    /* Indicate that the photo has been modified. Subtract 1 from index since array is zero-based */ 
                    modifiedIndices[i - 1] = true;
                    trackModifiedIndices(modifiedIndices, maxNumPictures);
				}
				
				reader.readAsDataURL(input.files[0]);
			}
		} else {
			/* The uploaded file is not recognized as a valid image file type */
			input.value = '';
		}
	}

    /**
     * Pass a string representing the indices of the product photos that have been edited or added
     * to a hidden input text field.
     * 
     * This string is a concatenation of the indices of these photos (arranged in ascending order).
     * For example, if the indices are 1 and 4, the string is "14"
     * 
     * Precondition:
     * - All the indices must be single-digit numbers.
     * 
     * @param modifiedIndices new indices of the product photos
     * @param maxNumPictures maximum number of pictures that can be associated with a product
     */
    function trackModifiedIndices(modifiedIndices, maxNumPictures) {
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

    /**
     * Sets the click listener for removing the product photos
     */
    function removePic() {
        /* The indices of the HTML IDs are one-based */
        for (let i = 1; i <= maxNumPictures; i++) {
            $('#remove-img' + i).on('click', function() {
                $('#icon' + i).css('display', 'block');
                $('#pic' + i).css('display', 'none');

                /* Indicate that the photo has been removed. Subtract 1 from index since array is zero-based */ 
                deletedIndices[i - 1] = true;
                trackDeletedIndices(deletedIndices, maxNumPictures);

                /* Remove from the modified indices to signify that no file is to be passed to the server */
                modifiedIndices[i - 1] = false;
                trackModifiedIndices(modifiedIndices, maxNumPictures);

                /* Remove the remove button from view */
				$('#remove-img' + i).css('visibility', 'hidden');

                /* Clear the input field */
                $('#product-img-' + i).val('');
            });
        }
    }

    /**
     * Pass a string representing the indices of the product photos that have been removed
     * to a hidden input text field.
     * 
     * This string is a concatenation of the indices of these photos (arranged in ascending order).
     * For example, if the indices are 1 and 4, the string is "14"
     * 
     * Precondition:
     * - All the indices must be single-digit numbers.
     * 
     * @param deletedIndices indices of the product photos that have been removed
     * @param maxNumPictures maximum number of pictures that can be associated with a product
     */
    function trackDeletedIndices(deletedIndices, maxNumPictures) {
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
});