$(document).ready(function() {
	$('#login-form').on('submit', function(e) {		
		e.preventDefault();
			
		$.ajax({
			url: '/postLogIn',
			method: 'POST',
			data: $('#login-form').serialize(),
			statusCode: {
				200: function() {
					window.location.replace('/');
				},
				
				403: function() {
					$('#error-text').text('Incorrect username and/or password');
					$('#password').val('');
				}
			}
		});
	});
});
