/* Controller for handling the new product page */

/* The db file, display schema, and catalog item schema are used for the new product page */
const db = require('../models/db.js');
const Display = require('../models/display-schema.js');
const CatalogItem = require('../models/catalog-item-schema.js');

const newProductController = {

	/** 
	 * Displays the new product page
	 * 
	 * @param req object that contains information on the HTTP request from the client
	 * @param res object that contains information on the HTTP response from the server 
	 */
	getNewProduct: function(req, res) {

		/* Prepare a query for the web application logo */
		let query = {id: 0};
		
		/* Retrieve the web application logo from the database */
		db.findOne(Display, query, '', function(result) {
			
			/* If the data retrieval was successful, display the new product page */
			if (result) {

				/* If the user is using an administrator account, display the new product page */
				if (req.session.isAdmin == true) {
					let details = {
						style: 'new-product',
						logo: result.logo,
						userFlag: true,
						adminFlag: true
					}

					res.render('new-product', details);

				/* If the user is not using an administrator account, redirect them to the landing page;
				 * only the administrator is allowed to add products to the catalog
				 */
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

			/* If the data retrieval was not successful, display an error message */			
			} else {
				console.log("Missing graphics elements");
			}
		});
	},

	/**
	 * Submits information stored in the new product page
	 * 
	 * @param req object that contains information on the HTTP request from the client
	 * @param res object that contains information on the HTTP response from the server 
	 */
	postNewProduct: function(req, res) {

		/* Iterate over the five pictures */
		var paths = [];
		
		/* Names in the HTML form are one-based */
		for (let i = 1; i <= 5; i++) {
			if (req.files['productImg' + i]) {
				paths.push('/files/' + req.files['productImg' + i][0]['filename'])
			}
		}

		/* Use a placeholder image if no images have been uploaded */
		if (paths.length == 0) {
			paths.push('img/placeholder/no-image.png');
		}

		/* Retrieve the data entered in the text fields */
		let productName = req.body.productName;
		let productDesc = req.body.productDesc;
		let productPrice = req.body.productPrice;
		let productQuantity = req.body.productQuantity;

		/* Trim the entered data to remove heading and trailing whitespaces */
		let formattedProductName = productName.trim();
		let formattedProductDesc = productDesc.trim();
		let formattedProductPrice = productPrice.trim();
		let formattedProductQuantity = productQuantity.trim();

		/* Assign the needed details to the variable product */
		let product = {
			name: formattedProductName,
			quantity: formattedProductQuantity,
			description: formattedProductDesc,
			price: formattedProductPrice,
			commentIds: [],
			pictures: paths,
			ratings: [],
			numberSold: 0
		}

		/* Insert the new product into the database and redirect the user to the landing page */
		db.insertOne(CatalogItem, product, function(flag) {
			res.redirect('/');
		});
	}
}

module.exports = newProductController;