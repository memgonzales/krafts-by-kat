const db = require('../models/db.js');

const Display = require('../models/display-schema.js');

const newProductController = {
	getNewProduct: function(req, res) {
		let query = {id: 0};
		
		db.findOne(Display, query, '', function(result) {
			if (result) {
				
				let details = {
					style: 'new-product',
					logo: result.logo,
					userFlag: true,
					adminFlag: true
				}

				res.render('new-product', details);
			} else {
				console.log("Missing graphics elements");
			}
		});
	}
}

module.exports = newProductController;