$(document).ready(function() {
	/* Supply the contents of the region dropdown */
	const ph = JSON.parse($('#ph').text());

	regions = []
	for (var key in ph) {
		regions.push(ph[key]["region_name"]);
	}

	regions.sort();
	
	for (let region of regions) {
		$('#region').append(new Option(region, region));
	}
	
	/* Supply the contents of the province dropdown depending on the region selected */
	$('#region').on('change', function() {
		const provinces = loadProvinces($('#region').prop('selectedIndex'));
		
		$('#province').empty();
		$('#province').append(new Option("", ""));
		$('#province option:first-child').attr("disabled", "disabled");
		for (let province of provinces) {
			$('#province').append(new Option(province, province));
		}
	});

	/* Ajax for submitting the form */
	$('#signup-form').on('submit', function(e) {		
		e.preventDefault();
			
		$.ajax({
			url: '/postSignup',
			method: 'POST',
			data: $('#signup-form').serialize(),
			statusCode: {
				200: function() {
					$('#signup-success-modal').modal('show');
				}
			}
		});
	});
});