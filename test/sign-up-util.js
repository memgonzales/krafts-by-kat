const mapRegionNumbers = function(ph) {
    let regionNumbersMap = new Map();
    for (let region in ph) {
        regionNumbersMap[ph[region]["region_name"]] = region;
    }

    return regionNumbersMap;
}

const loadProvinces = function(regionName, ph, regionNumbers) {
    let provinces = [];

    for (let province in ph[regionNumbers[regionName]]['province_list']) {
        provinces.push(province);
    }

    return provinces;
}

const loadCities = function(regionName, provinceName, ph, regionNumbers) {
    let cities = [];

    for (let city in ph[regionNumbers[regionName]]['province_list'][provinceName]['municipality_list']) {
        cities.push(city);
    }

    return cities;
}

const loadBarangays = function(regionName, provinceName, cityName, ph, regionNumbers) {
    let barangays = [];

    for (let barangay of ph[regionNumbers[regionName]]['province_list'][provinceName]['municipality_list'][cityName]['barangay_list']) {
        barangays.push(barangay);
    }

    return barangays;
}

module.exports = {
    mapRegionNumbers,
    loadProvinces,
    loadCities,
    loadBarangays
}