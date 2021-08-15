const db = require('../models/db.js');

const Display = require('../models/display-schema.js');
const CatalogItem = require('../models/catalog-item-schema.js');

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
							style: 'index',
							logo: result.logo,
							userFlag: false,
							adminFlag: false
						}

						res.render('index', details);
					} else {
						let details = {
							style: 'index',
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
	},

	postNewProduct: function(req, res) {
		console.log(req.files);


		let productName = req.body.productName;
		let productDesc = req.body.productDesc;
		let productPrice = req.body.productPrice;
		let productQuantity = req.body.productQuantity;

		let product = {
			name: productName,
			quantity: productQuantity,
			description: productDesc,
			price: productPrice,
			quantity: productQuantity
		}

		console.log(product);

		db.insertOne(CatalogItem, product, function(flag) {
			res.send(200);
		});
	}
}

module.exports = newProductController;