const db = require('../models/db.js');
const Display = require('../models/display-schema.js');

const indexController = {
	getDisplay: function(req, res) {
		let query = {id: 0}
		
		db.findOne(Display, query, '', function(result) {
			if (result) {
				let details = {
					style: 'index',
					logo: result.logo
				}
					
				res.render('index', details);
			} else {
				console.log("Missing graphics elements");
			}
		});
	}
}

module.exports = indexController;