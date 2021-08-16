$(document).ready(function() {
	/* Initialize to five empty strings to handle changing of pictures */
	let imgTargetResultsOrig = ['', '', '', '', ''];
	const maxNumPictures = $('#img-parent-div').children().length;

	triggerUpload();
	changePicOnUpload();
	preview();
	cancel();
	
	function cancel() {
		/* Clear the picture fields */
		$('#cancel-product').click(function() {
			/* The indices of the HTML IDs are one-based */
			for (let i = 1; i <= maxNumPictures; i++) {
				$('#img-' + i).css('display', 'block');
				$('#pic-' + i).css('display', 'none');

				/* The indices of the array are zero-based. Remove the saved images */
				imgTargetResultsOrig[i - 1] = '';

				/* Use the image placeholder */
				$('#polaroid-pic-1').attr('src', '/img/placeholder/no-image.png');
				$('#preview-polaroid').click();
			}
		});
	}

	function triggerUpload() {
		/* Click the image and trigger upload */
		for (let i = 1; i <= maxNumPictures; i++) {
			$('#img-' + i).on('click', function() {
				$('#product-img-' + i).click();
			});	

			$('#pic-' + i).on('click', function() {
				$('#product-img-'  + i).click();
			});
		}
	}

	function changePicOnUpload() {
		/* Change the picture upon upload */
		for (let i = 1; i <= maxNumPictures; i++) {
			$('#product-img-' + i).on('change', function() {
				readURL(this, i);
			});
		}
	}

	function preview() {
		/* Refresh the preview */
		$('#preview-polaroid').click(function() {
			previewPictures();
			previewText();
		});
	}

	function previewPictures() {
		let imgTargetResults = [];

		/* Push only uploaded images */
		for (var imgTargetResult of imgTargetResultsOrig) {
			if (imgTargetResult != '') {
				imgTargetResults.push(imgTargetResult);
			}
		}

		let imgCtr = imgTargetResults.length;
		let i = 0;

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

	function previewText() {
		let productName = $('#product-name').val();
		let productPrice = $('#product-price').val();
		let formattedProductName = productName.trim();
		let formattedProductPrice = '₱'+ parseFloat(productPrice.trim()).toLocaleString('en-US', {maximumFractionDigits: 2});

		$('#item-name').text(formattedProductName);
		$('#item-price').text(formattedProductPrice);
	}

	function readURL(input, i) {
		if (input.files && input.files[0]) {
			let reader = new FileReader();
			reader.onload = function(e) {
				$('#img-' + i).css('display', 'none');
				$('#pic-' + i).css('display', 'block');
				$('#pic-' + i).attr('src', e.target.result).width(150).height(100);

				/* Store the image file paths in an array. Subtract 1 from index since array is zero-based. */
				imgTargetResultsOrig[i - 1] = e.target.result;
			}
			
			reader.readAsDataURL(input.files[0]);
		}
	}
});

