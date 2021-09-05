/* JavaScript file for handling the front end of the new product page */

$(document).ready(function() {
	/* Show warning if navigating away from page */
	window.onbeforeunload = function() {
		return true;
	};

	/* Remove warning if submitting the form */
	$('#upload-new-product-form').on('submit', function() {
		window.onbeforeunload = null;
	});

	/* The maximum number of pictures is the number of children of the div with the id below. */
	const maxNumPictures = $('#img-parent-div').children().length;

	/* Use this placeholder image used when the user did not upload a photo */
	const placeholder = '/img/placeholder/no-image.png';

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

	/* Call the triggerUpload(), changePicOnUpoad(), preview(), and cancel() methods */
	hideRemoveImg(maxNumPictures);
	triggerUpload();
	changePicOnUpload();
	preview();
	cancel();
	removePic();

	/**
	 * Hides the remove buttons of all the product photos
	 * 
	 * Initially, all the remove buttons are hidden from view
	 */
	function hideRemoveImg(maxNumPictures) {
		for (let i = 1; i <= maxNumPictures; i++) {
			$('#remove-img' + i).css('visibility', 'hidden');
		}
	}

	/**
     * Sets the click listener for removing the product photos
     */
	 function removePic() {
        /* The indices of the HTML IDs are one-based */
        for (let i = 1; i <= maxNumPictures; i++) {
            $('#remove-img' + i).on('click', function() {
                $('#img-' + i).css('display', 'block');
                $('#pic-' + i).css('display', 'none');

				/* Use zero-based indexing for the array storing the image file paths for the preview */
				imgTargetResultsOrig[i - 1] = ''

				/* Remove the remove button from view */
				$('#remove-img' + i).css('visibility', 'hidden');

                /* Clear the input field */
                $('#product-img-' + i).val('');
            });
        }	
    }
	
	/** 
	 * Clears the picture fields
	 */
	function cancel() {
		$('#cancel-product').click(function() {
			/* Redirect the user to the home page */
			location.href = "/";
		});
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
	 * Refresh the polaroid preview
	 */ 
	function preview() {
		$('#preview-polaroid').click(function() {
			previewPictures(imgTargetResultsOrig);
			previewText();
		});
	}

	/**
	 * Display the uploaded images on the polaroid preview
	 */
	function previewPictures(imgTargetResultsOrig) {
		let imgTargetResults = [];

		/* Push only uploaded images */
		for (var imgTargetResult of imgTargetResultsOrig) {
			if (imgTargetResult != '') {
				imgTargetResults.push(imgTargetResult);
			}
		}

		let imgCtr = imgTargetResults.length;
		let i = 0;

		/* Handle the case when the user uploads only a single product photo then removes it */
		if (imgCtr == 0) {
			$('#polaroid-pic-1').attr('src', placeholder);
			return;
		}

		/* Reset first polaroid picture to active status */
		$('#polaroid-div-1').addClass('active');

		/* Remove the existing polaroid pictures, except the first one */
		for (let j = 2; j <= maxNumPictures; j++) {
			$('#polaroid-div-' + j).remove();
		}

		if (imgCtr >= 1) {
			$('#polaroid-pic-1').attr('src', imgTargetResults[i]);
			i++;

			imgCtr--;

			/* Create a new carousel item for each additional image */
			while (imgCtr != 0) {
				let divImg = document.createElement("div");
				divImg.className = "carousel-item";

				let img = document.createElement("img");
				img.src = imgTargetResults[i];

				divImg.appendChild(img);
				document.getElementById('polaroid-pic-carousel').appendChild(divImg);

				/* Increment immediately since the IDs of the polaroid pictures are one-based */
				i++;
				img.id = "polaroid-pic-" + i;
				img.className = "d-block w-100  thumbnail";
				img.alt = "item " + i;
				divImg.id = "polaroid-div-" + i;

				imgCtr--;
			}
		}
	}

	/** 
	 * Display the entered text on the polaroid preview
	 */
	function previewText() {

		/* Retrieve the entered product name and price from the new product page and apply some formatting */
		let productName = $('#product-name').val();
		let productPrice = $('#product-price').val();
		let formattedProductName = productName.trim();
		let formattedProductPrice = '';
		
		/* Check if the user input a product price */
		if (productPrice) {
			/* Use commas to separate groups of three digits */
			formattedProductPrice = '₱'+ parseFloat(productPrice.trim()).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
		}

		/* Display the formatted product name and price on the polaroid */
		$('#item-name').text(formattedProductName);
		$('#item-price').text(formattedProductPrice);
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
		let isImage = imgFilter(extension.toLowerCase());

		/* The uploaded file is recognized as a valid image file type */
		if (isImage) {
			if (input.files && input.files[0]) {
				let reader = new FileReader();
				reader.onload = function(e) {
					$('#img-' + i).css('display', 'none');
					$('#pic-' + i).css('display', 'block');
					$('#pic-' + i).attr('src', e.target.result).width(150).height(100);

					/* Display the remove photo button */
					$('#remove-img' + i).css('visibility', 'visible');

					/* Store the image file paths in an array. Subtract 1 from index since array is zero-based. */
					imgTargetResultsOrig[i - 1] = e.target.result;
				}
				
				reader.readAsDataURL(input.files[0]);
			}
		} else {
			/* The uploaded file is not recognized as a valid image file type */
			input.value = '';
		}
	}

	/**
	 * Prevents the uploading of non-image files on the client-side by displaying an alert
	 * 
	 * @param extension extension of the file uploaded (all letters in lowercase)
	 */
	function imgFilter(extension) {
		switch(extension) {
			/* Fall through in all cases is deliberate */
			case 'jpg':
			case 'jpeg':
			case 'jpe':
			case 'jfif':
			case 'heic':
			case 'png':
			case 'gif':
			case 'webp':
			case 'bmp':
			case 'svg':
				return true;
			default:
				alert('This file type is not supported. Please upload a valid image.');
				return false;
		}
	}
});

