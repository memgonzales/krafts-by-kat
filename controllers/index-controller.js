const db = require('../models/db.js');

const Display = require('../models/display-schema.js');

const indexController = {
	getDisplay: function(req, res) {
		let query = {id: 0};
		
		db.findOne(Display, query, '', function(result) {
			if (result) {
				if (req.session.username == undefined) {
					let details = {
						style: 'index',
						logo: result.logo,
						userFlag: false,
						adminFlag: false
					}

					res.render('index', details);
				} else {
					if (req.session.isAdmin == true) {
						let details = {
							style: 'index',
							logo: result.logo,
							userFlag: true,
							adminFlag: true,
							username: req.session.username
						}

						res.render('index', details);
					} else {
						let details = {
							style: 'index',
							logo: result.logo,
							userFlag: true,
							adminFlag: false,
							username: req.session.username
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

module.exports = indexController;