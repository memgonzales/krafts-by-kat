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
		/* Iterate over the five pictures */
		var paths = [];
		
		/* Names in the HTML form are one-based */
		for (let i = 1; i <= 5; i++) {
			if (req.files['productImg' + i]) {
				paths.push('/files/' + req.files['productImg' + i][0]['filename'])
			}
		}

		let productName = req.body.productName;
		let productDesc = req.body.productDesc;
		let productPrice = req.body.productPrice;
		let productQuantity = req.body.productQuantity;

		let formattedProductName = productName.trim();
		let formattedProductDesc = productDesc.trim();
		let formattedProductPrice = productPrice.trim();
		let formattedProductQuantity = productQuantity.trim();

		let product = {
			name: formattedProductName,
			quantity: formattedProductQuantity,
			description: formattedProductDesc,
			price: formattedProductPrice,
			pictures: paths
		}

		console.log(product);

		db.insertOne(CatalogItem, product, function(flag) {
			res.send(200);
		});
	}
}

module.exports = newProductController;