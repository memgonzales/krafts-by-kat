/* Controller for handling the products manager page */

/* The db file, display schema, and catalog schema are used for the account page */
const db = require('../models/db.js');
const Display = require('../models/display-schema.js');
const CatalogItem = require('../models/catalog-item-schema.js');

const productsManagerController = {
	/**
	 * Deletes the selected product from the database
	 * @param req object that contains information on the HTTP request from the client
	 * @param res object that contains information on the HTTP response from the server 
	 */
	postDeleteItem: function(req, res) {

		/* Obtain the ID of the product to be deleted from the modal */
		let id = req.body.modalDeleteProductId;

		/* Delete the catalog item document with the corresponding ID */
		let conditions = {_id: db.convertToObjectId(id)};

		db.deleteOne(CatalogItem, conditions, function(err, result) {
			/* If the deletion is successful, update the products manager page */
			res.status(200).send();
		});
	},

	/**
	 * Gets the edit product page
	 * @param req object that contains information on the HTTP request from the client
	 * @param res object that contains information on the HTTP response from the server 
	 */
	getEditItem: function(req, res) {
		/* Prepare a query for the web application logo */
		let query = {id: 0};
		
		/* Retrieve the web application logo from the database */
		db.findOne(Display, query, '', function(result) {
			
			/* If the data retrieval was successful, display the account page */
			if (result) {

				appLogo = result;

				/* If the user is using an administrator account, display the page accordingly */
				if (req.session.isAdmin == true) {

					/* Retrieve the data corresponding to the ID of the selected product */
					let query = {_id: db.convertToObjectId(req.params.id)};
					let projection = '_id name quantity price description ratings numberSold pictures';

					db.findOne(CatalogItem, query, projection, function(result) {
						let item = result;

						/* Compute for the average rating of the product */
						let aveRating = 0;
						let numRatings = item.ratings.length;

						if (numRatings > 0) {
							let totalRating = 0;
							for (let i = 0; i < numRatings; i++) {
								totalRating += items.ratings[i];
							}

							aveRating = totalRating / numRatings;
						}

						let details = {
							style: 'edit-product',
							logo: appLogo.logo,
							userFlag: true,
							adminFlag: true,
							username: req.session.username,
							isAdmin: req.session.isAdmin,

							id: item._id,
							name: item.name,
							quantity: item.quantity,
							price: item.price,
							description: item.description,
							numberSold: item.numberSold,
							aveRating: aveRating,
							numRatings: numRatings,
							pictures: item.pictures
						}

						res.render('edit-product', details);
					});

				/* If the user is not the admin, redirect them to the landing page */
				} else {
					res.redirect('/');
				}	

			/* If the data retrieval was not successful, display an error message */			
			} else {
				console.log("Missing graphics elements");
			}
		});
	},

	/**
	 * Gets the view product page
	 * @param req object that contains information on the HTTP request from the client
	 * @param res object that contains information on the HTTP response from the server 
	 */
	getViewItem: function(req, res) {
		/* Prepare a query for the web application logo */
		let query = {id: 0};
		
		/* Retrieve the web application logo from the database */
		db.findOne(Display, query, '', function(result) {
			
			/* If the data retrieval was successful, display the account page */
			if (result) {

				appLogo = result;

				/* If the user is using an administrator account, display the nav bar accordingly */
				if (req.session.isAdmin == true) {
					
					/* Retrieve the data corresponding to the ID of the selected product */
					let query = {_id: db.convertToObjectId(req.params.id)};
					let projection = '_id name quantity price description ratings numberSold pictures';

					db.findOne(CatalogItem, query, projection, function(result) {
						let item = result;

						/* Compute for the average rating of the product */
						let aveRating = 0;
						let numRatings = item.ratings.length;

						if (numRatings > 0) {
							let totalRating = 0;
							for (let i = 0; i < numRatings; i++) {
								totalRating += items.ratings[i];
							}

							aveRating = totalRating / numRatings;
						}

						let details = {
							style: 'view-product',
							logo: appLogo.logo,
							userFlag: true,
							adminFlag: true,
							username: req.session.username,
							isAdmin: req.session.isAdmin,

							id: item._id,
							name: item.name,
							quantity: item.quantity,
							price: item.price,
							description: item.description,
							numberSold: item.numberSold,
							aveRating: aveRating,
							numRatings: numRatings,
							pictures: item.pictures
						}

						res.render('view-product', details);
					});

				/* If the user is unregistered, display the nav bar accordingly */
				} else {
					if (req.session.username == undefined) {

						/* Retrieve the data corresponding to the ID of the selected product */
						let query = {_id: db.convertToObjectId(req.params.id)};
						let projection = '_id name quantity price description ratings numberSold pictures';

						db.findOne(CatalogItem, query, projection, function(result) {
							let item = result;

							/* Compute for the average rating of the product */
							let aveRating = 0;
							let numRatings = item.ratings.length;

							if (numRatings > 0) {
								let totalRating = 0;
								for (let i = 0; i < numRatings; i++) {
									totalRating += items.ratings[i];
								}

								aveRating = totalRating / numRatings;
							}

							let details = {
								style: 'view-product',
								logo: appLogo.logo,
								userFlag: false,
								adminFlag: false,
								username: req.session.username,
								isAdmin: req.session.isAdmin,

								id: item._id,
								name: item.name,
								quantity: item.quantity,
								price: item.price,
								description: item.description,
								numberSold: item.numberSold,
								aveRating: aveRating,
								numRatings: numRatings,
								pictures: item.pictures
							}

							res.render('view-product', details);
						});

					/* If the user is not the admin, display the nav bar accordingly */
					} else {

						/* Retrieve the data corresponding to the ID of the selected product */
						let query = {_id: db.convertToObjectId(req.params.id)};
						let projection = '_id name quantity price description ratings numberSold pictures';

						db.findOne(CatalogItem, query, projection, function(result) {
							let item = result;

							/* Compute for the average rating of the product */
							let aveRating = 0;
							let numRatings = item.ratings.length;

							if (numRatings > 0) {
								let totalRating = 0;
								for (let i = 0; i < numRatings; i++) {
									totalRating += items.ratings[i];
								}

								aveRating = totalRating / numRatings;
							}

							let details = {
								style: 'view-product',
								logo: appLogo.logo,
								userFlag: true,
								adminFlag: false,
								username: req.session.username,
								isAdmin: req.session.isAdmin,

								id: item._id,
								name: item.name,
								quantity: item.quantity,
								price: item.price,
								description: item.description,
								numberSold: item.numberSold,
								aveRating: aveRating,
								numRatings: numRatings,
								pictures: item.pictures
							}

							res.render('view-product', details);
						});
					}
				}	

			/* If the data retrieval was not successful, display an error message */			
			} else {
				console.log("Missing graphics elements");
			}
		});
	},

	/**
	 * Toggles the visibility of a product
	 * @param req object that contains information on the HTTP request from the client
	 * @param res object that contains information on the HTTP response from the server 
	 */
	getToggleVisibility: function(req, res) {
		/* Prepare a query for the web application logo */
		let query = {id: 0};
		
		/* Retrieve the web application logo from the database */
		db.findOne(Display, query, '', function(result) {
			
			/* If the data retrieval was successful, display the account page */
			if (result) {

				appLogo = result;

				/* If the user is using an administrator account, display the page accordingly */
				if (req.session.isAdmin == true) {

					/* Retrieve the visibility of the selected product */
					let query = {_id: db.convertToObjectId(req.params.id)};
					let projection = 'visible';

					db.findOne(CatalogItem, query, projection, function(result) {
						let item = result;
						let filter = {_id: db.convertToObjectId(req.params.id)};
						
						/* If the item is originally visible, set its visibility to false, and vice versa */
						let update;
						if (item.visible) {
							update = {visible: false};
						} else {
							update = {visible: true};
						}

						db.updateOne(CatalogItem, filter, update, function(error, result) {

							/* Reload the products manager page after updating the product visibility */
							res.redirect('/account/admin/productsManager');
						});
					});

				/* If the user is not the admin, redirect them to the landing page */
				} else {
					res.redirect('/');
				}	

			/* If the data retrieval was not successful, display an error message */			
			} else {
				console.log("Missing graphics elements");
			}
		});
	}
}

module.exports = productsManagerController;