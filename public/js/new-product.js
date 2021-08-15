$(document).ready(function() {
	/* Click the image and trigger upload */
	$('#img-1').on('click', function() {
		$('#product-img-1').click();
	});
	
	$('#img-2').on('click', function() {
		$('#product-img-2').click();
	});
	
	$('#img-3').on('click', function() {
		$('#product-img-3').click();
	});
	
	$('#img-4').on('click', function() {
		$('#product-img-4').click();
	});
	
	$('#img-5').on('click', function() {
		$('#product-img-5').click();
	});
	
	$('#pic-1').on('click', function() {
		$('#product-img-1').click();
	});
	
	$('#pic-2').on('click', function() {
		$('#product-img-2').click();
	});
	
	$('#pic-3').on('click', function() {
		$('#product-img-3').click();
	});
	
	$('#pic-4').on('click', function() {
		$('#product-img-4').click();
	});
	
	$('#pic-5').on('click', function() {
		$('#product-img-5').click();
	});

	/* Change the picture upon upload */
	for (let i = 1; i <= 5; i++) {
		$('#product-img-' + i).on('change', function() {
			readURL(this, i);
		});
	}

	/* Refresh the preview */
	$('#preview-polaroid').click(function() {
		let imgCtr = imgTargetResults.length;
		let i = 0;

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

				imgCtr--;
			}
		}
	});

	let imgTargetResults = [];

	function readURL(input, i) {
		if (input.files && input.files[0]) {
			let reader = new FileReader();
			reader.onload = function(e) {
				$('#img-' + i).css('display', 'none');
				$('#pic-' + i).attr('src', e.target.result).width(150).height(100);

				/* Store the image file paths in an array */
				imgTargetResults.push(e.target.result);
			}
			
			reader.readAsDataURL(input.files[0]);
		}
	}
});

