$(document).ready(function() {
	/* Supply the contents of the region dropdown */
	const ph = JSON.parse($('#ph').text());

	const regionNumbers = mapRegionNumbers(ph);

	let regions = []
	for (var region in ph) {
		regions.push(ph[region]["region_name"]);
	}

	regions.sort();
	
	for (let region of regions) {
		$('#region').append(new Option(region, region));
	}
	
	/* Supply the contents of the province dropdown depending on the region selected */
	$('#region').on('change', function() {
		const provinces = loadProvinces($('#region').val(), ph, regionNumbers);
		
		$('#province').empty();
		$('#province').append(new Option('', ''));
		$('#province option:first-child').attr('disabled', 'disabled');
		for (let province of provinces) {
			$('#province').append(new Option(province, province));
		}
	});

	$('#province').on('change', function() {
		const cities = loadCities($('#region').val(), $('#province').val(), ph, regionNumbers);
		
		$('#city').empty();
		$('#city').append(new Option('', ''));
		$('#city option:first-child').attr('disabled', 'disabled');
		for (let city of cities) {
			$('#city').append(new Option(city, city));
		}
	});

	$('#city').on('change', function() {
		const barangays = loadBarangays($('#region').val(), $('#province').val(), $('#city').val(), ph, regionNumbers);
		
		$('#barangay').empty();
		$('#barangay').append(new Option('', ''));
		$('#barangay option:first-child').attr('disabled', 'disabled');
		for (let barangay of barangays) {
			$('#barangay').append(new Option(barangay, barangay));
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

	function mapRegionNumbers(ph) {
		let regionNumbersMap = new Map();
		for (let region in ph) {
			regionNumbersMap[ph[region]["region_name"]] = region;
		}

		return regionNumbersMap;
	}

	function loadProvinces(regionName, ph, regionNumbers) {
		let provinces = [];

		for (let province in ph[regionNumbers[regionName]]['province_list']) {
			provinces.push(province);
		}

		return provinces;
	}

	function loadCities(regionName, provinceName, ph, regionNumbers) {
		let cities = [];

		for (let city in ph[regionNumbers[regionName]]['province_list'][provinceName]['municipality_list']) {
			cities.push(city);
		}

		return cities;
	}

	function loadBarangays(regionName, provinceName, cityName, ph, regionNumbers) {
		let barangays = [];

		for (let barangay of ph[regionNumbers[regionName]]['province_list'][provinceName]['municipality_list'][cityName]['barangay_list']) {
			barangays.push(barangay);
		}

		return barangays;
	}
});