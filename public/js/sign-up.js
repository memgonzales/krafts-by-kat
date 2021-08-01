$(document).ready(function() {
	/* Supply the contents of the region dropdown */
	const regions = loadRegions();
	
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
});

function loadRegions() {
	const regions = ["NCR - National Capital Region",
					 "CAR - Cordillera Administrative Region",
					 "I - Ilocos Region",
					 "II - Cagayan Valley",
					 "III - Central Luzon",
					 "IVA - CALABRZON",
					 "IVB - MIMAROPA",
					 "V - Bicol Region",
					 "VI - Western Visayas",
					 "VII - Central Visayas",
					 "VIII - Eastern Visayas",
					 "IX - Zamboanga Peninsula",
					 "X - Northern Mindanao",
					 "XI - Davao Region",
					 "XII - SOCCSKSARGEN",
					 "XIII - Caraga",
					 "BARMM - Bangsamoro Autonomous Region in Muslim Mindanao"];
					 
	return regions;
}

function loadProvinces(regionIndex) {
	var provinces = []
	
	switch (regionIndex) {
		/* Start at 1 to account for blank option */
		case 1:
			provinces = ["Metro Manila"];
			break;
			
		case 2:
			
		
		case 3:
			provinces = ["Ilocos Norte",
						 "Ilocos Sur",
						 "La Union",
						 "Pangasinan"];
			break;
			
		case 4:
			provinces = ["Batanes",
						 "Cagayan",
						 "Isabela",
						 "Nueva Vizcaya",
						 "Quirino"];
			break;
		
		case 5:
			provinces = ["Aurora",
						 "Bataan",
						 "Bulacan",
						 "Nueva Ecija",
						 "Pampanga",
						 "Tarlac",
						 "Zambales"];
			break;
			
		case 6:
			provinces = ["Batangas",
						 "Cavite",
						 "Laguna",
						 "Quezon",
						 "Rizal"];
			break;
			
		case 7:
			provinces = ["Marinduque",
						 "Occidental Mindoro",
						 "Oriental Mindoro",
						 "Palawan",
						 "Romblon"];
			break;
			
		case 8:
			provinces = ["Albay",
						 "Camarines Norte",
						 "Camarines Sur",
						 "Catanduanes",
						 "Masbate",
						 "Sorsogon"];
			break;
			
		case 9:
			provinces = ["Aklan",
						 "Antique",
						 "Capiz",
						 "Guimaras",
						 "Iloilo",
						 "Negros Occidental"];
			break;
			
		case 10:
			provinces = ["Bohol",
						 "Cebu",
						 "Negros Oriental",
						 "Siquijor"];
			break;
			
		case 11:
			provinces = ["Biliran",
						 "Eastern Samar",
						 "Leyte",
						 "Northern Samar",
						 "Samar",
						 "Southern Leyte"];
			break;
			
		case 12:
			provinces = ["Zamboanga del Norte",
						 "Zamboanga del Sur",
						 "Zamboanga Sibugay"];
			break;
			
		case 13:
			provinces = ["Bukidnon",
						 "Camiguin",
						 "Lanao del Norte",
						 "Misamis Occidental",
						 "Misamis Oriental"];
			break;
			
		case 14:
			provinces = ["Davao de Oro",
						 "Davao del Norte",
						 "Davao del Sur",
						 "Davao Occidental",
						 "Davao Oriental"];
			break;
			
		case 15:
			provinces = ["Cotabato",
						 "Sarangani",
						 "South Cotabato",
						 "Sultan Kudarat"];
			break;
			
		case 16:
			provinces = ["Agusan del Norte",
						 "Agusan del Sur",
						 "Dinagat Islands",
						 "Surigao del Norte",
						 "Surigao del Sur"];
			break;
			
		case 17:
			provinces = ["Basilan",
						 "Lanao del Sur",
						 "Maguindanao",
						 "Sulu",
						 "Tawi-tawi"];
			break;
		
		default:
			break;
	}
	
	return provinces;
}