/* For file upload - FOR TESTING ONLY : REMOVE ON DEPLOYMENT */

$(document).ready(function() {
	$('#upload-test-form').on('submit', function(e) {
		alert("Ok! Go to localhost:3000");
		
		e.preventDefault();
		
		let formData = new FormData($('#upload-test-form').get(0));
				
		$.ajax({
			url: '/uploadLogo',
			method: 'POST',
			data: formData,
			processData: false,
			contentType: false
		});
	});
});
