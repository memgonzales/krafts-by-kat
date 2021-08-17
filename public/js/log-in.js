/* JavaScript file for handling the front end of the log in page */

$(document).ready(function() {
	$('#login-form').on('submit', function(e) {		
		
		/* Override the default submit behavior and insert AJAX */
		e.preventDefault();
			
		$.ajax({
			url: '/postLogIn',
			method: 'POST',
			data: $('#login-form').serialize(),
			statusCode: {

				/* If the log in is successful, redirect the user to the landing page */
				200: function() {
					window.location.replace('/');
				},
				
				/* Otherwise, display an error message */
				403: function() {
					$('#error-text').css('color', '#C70039');
					$('#password').val('');
				}
			}
		});
	});
});
