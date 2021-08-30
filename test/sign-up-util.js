const mapRegionNumbers = function(ph) {
    let regionNumbersMap = new Map();
    for (let region in ph) {
        regionNumbersMap[ph[region]["region_name"]] = region;
    }

    return regionNumbersMap;
}

module.exports = {
    mapRegionNumbers
}