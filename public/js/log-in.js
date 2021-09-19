/* JavaScript file for handling the front end of the log in page */

$(document).ready(function() {
	$('#login-form').on('submit', function(e) {
		/* Remove warning if submitting the form */
		window.onbeforeunload = null;
		
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
				401: function() {
					logInError()
				}
			}
		});
	});

	/**
	 * Highlights the erroneous text field and resets the password text field when there is a log in error
	 * concerning the guest's input
	 */
	function logInError() {
		$('#error-text').css('color', '#C70039');
		$('#password').val('');
	}
});
