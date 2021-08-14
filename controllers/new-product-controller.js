const db = require('../models/db.js');

const Display = require('../models/display-schema.js');

const newProductController = {
	getNewProduct: function(req, res) {
		let query = {id: 0};
		
		db.findOne(Display, query, '', function(result) {
			if (result) {
				if (req.session.isAdmin == true) {
					let details = {
						style: 'new-product',
						logo: result.logo,
						userFlag: true,
						adminFlag: true
					}

					res.render('new-product', details);
				} else {
					if (req.session.username == undefined) {
						let details = {
							style: 'new-product',
							logo: result.logo,
							userFlag: false,
							adminFlag: false
						}

						res.render('index', details);
					} else {
						let details = {
							style: 'new-product',
							logo: result.logo,
							userFlag: true,
							adminFlag: false
						}

						res.render('index', details);
					}
				}				
			} else {
				console.log("Missing graphics elements");
			}
		});
	}
}

module.exports = newProductController;