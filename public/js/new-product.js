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

	alert(imgTargetResults);
}