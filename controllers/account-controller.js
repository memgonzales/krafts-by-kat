/* Controller for handling the account page */

/* The db file, display schema, client schema, and catalog schema are used for the account page */
const db = require('../models/db.js');
const Display = require('../models/display-schema.js');
const Client = require('../models/client-schema.js');
const CatalogItem = require('../models/catalog-item-schema.js');

const accountController = {
	
	/**
	 * Gets the account page
	 * 
	 * @param req object that contains information on the HTTP request from the client
	 * @param res object that contains information on the HTTP response from the server 
	 */
	getAccount: function(req, res) {

		/* Prepare a query for the web application logo */
		let query = {id: 0};
		
		/* Retrieve the web application logo from the database */
		db.findOne(Display, query, '', function(result) {
			
			/* If the data retrieval was successful, display the account page */
			if (result) {

				/* If the user is using an administrator account, display the nav bar accordingly */
				if (req.session.isAdmin == true) {
					let details = {
						style: 'account',
						logo: result.logo,
						userFlag: true,
						adminFlag: true,
						username: req.session.username,
						isAdmin: req.session.isAdmin
					}

					res.render('user-account', details);

				/* If the user is not registered, redirect them to the landing page */
				} else {
					if (req.session.username == undefined) {
						res.redirect('/');

					/* If the user is using a regular account, display the nav bar accordingly */	
					} else {
						let details = {
							style: 'account',
							logo: result.logo,
							userFlag: true,
							adminFlag: false,
							username: req.session.username
						}

						res.render('user-account', details);
					}
				}	

			/* If the data retrieval was not successful, display an error message */			
			} else {
				console.log("Missing graphics elements");
			}
		});
	},

	/**
	 * Gets the account purchase history page
	 * 
	 * @param req object that contains information on the HTTP request from the client
	 * @param res object that contains information on the HTTP response from the server 
	 */
	getAccountPurchaseHistory: function(req, res) {

		/* Prepare a query for the web application logo */
		let query = {id: 0};
		
		/* Retrieve the web application logo from the database */
		db.findOne(Display, query, '', function(result) {
			
			/* If the data retrieval was successful, display the account page */
			if (result) {

				/* If the user is using an administrator account, display the nav bar accordingly */
				if (req.session.isAdmin == true) {
					let details = {
						style: 'account',
						logo: result.logo,
						userFlag: true,
						adminFlag: true,
						username: req.session.username,
						isAdmin: req.session.isAdmin
					}

					res.render('user-purchase-history', details);

				/* If the user is not registered, redirect them to the landing page */
				} else {
					if (req.session.username == undefined) {
						res.redirect('/');

					/* If the user is using a regular account, display the nav bar accordingly */	
					} else {
						let details = {
							style: 'account',
							logo: result.logo,
							userFlag: true,
							adminFlag: false,
							username: req.session.username
						}

						res.render('user-purchase-history', details);
					}
				}	

			/* If the data retrieval was not successful, display an error message */			
			} else {
				console.log("Missing graphics elements");
			}
		});
	},

	/**
	 * Gets the account support page
	 * 
	 * @param req object that contains information on the HTTP request from the client
	 * @param res object that contains information on the HTTP response from the server 
	 */
	getAccountSupport: function(req, res) {

		/* Prepare a query for the web application logo */
		let query = {id: 0};
		
		/* Retrieve the web application logo from the database */
		db.findOne(Display, query, '', function(result) {
			
			/* If the data retrieval was successful, display the account page */
			if (result) {

				/* If the user is using an administrator account, display the nav bar accordingly */
				if (req.session.isAdmin == true) {
					let details = {
						style: 'account',
						logo: result.logo,
						userFlag: true,
						adminFlag: true,
						username: req.session.username,
						isAdmin: req.session.isAdmin
					}

					res.render('user-support', details);

				/* If the user is not registered, redirect them to the landing page */
				} else {
					if (req.session.username == undefined) {
						res.redirect('/');

					/* If the user is using a regular account, display the nav bar accordingly */	
					} else {
						let details = {
							style: 'account',
							logo: result.logo,
							userFlag: true,
							adminFlag: false,
							username: req.session.username
						}

						res.render('user-support', details);
					}
				}	

			/* If the data retrieval was not successful, display an error message */			
			} else {
				console.log("Missing graphics elements");
			}
		});
	},

	/**
	 * Gets the admin orders page
	 * 
	 * @param req object that contains information on the HTTP request from the client
	 * @param res object that contains information on the HTTP response from the server 
	 */
	getAccountAdminOrders: function(req, res) {

		/* Prepare a query for the web application logo */
		let query = {id: 0};
		
		/* Retrieve the web application logo from the database */
		db.findOne(Display, query, '', function(result) {
			
			/* If the data retrieval was successful, display the account page */
			if (result) {

				/* If the user is using an administrator account, display the nav bar accordingly */
				if (req.session.isAdmin == true) {
					let details = {
						style: 'account',
						logo: result.logo,
						userFlag: true,
						adminFlag: true,
						username: req.session.username,
						isAdmin: req.session.isAdmin
					}

					res.render('admin-orders', details);

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
	 * Gets the admin messages page
	 * 
	 * @param req object that contains information on the HTTP request from the client
	 * @param res object that contains information on the HTTP response from the server 
	 */
	getAccountAdminMessages: function(req, res) {

		/* Prepare a query for the web application logo */
		let query = {id: 0};
		
		/* Retrieve the web application logo from the database */
		db.findOne(Display, query, '', function(result) {
			
			/* If the data retrieval was successful, display the account page */
			if (result) {

				/* If the user is using an administrator account, display the nav bar accordingly */
				if (req.session.isAdmin == true) {
					let details = {
						style: 'account',
						logo: result.logo,
						userFlag: true,
						adminFlag: true,
						username: req.session.username,
						isAdmin: req.session.isAdmin
					}

					res.render('admin-messages', details);

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
	 * Gets the admin products manager page
	 * 
	 * @param req object that contains information on the HTTP request from the client
	 * @param res object that contains information on the HTTP response from the server 
	 */
	getAccountAdminProductsManager: function(req, res) {

		/* Prepare a query for the web application logo */
		let query = {id: 0};
		
		/* Retrieve the web application logo from the database */
		db.findOne(Display, query, '', function(result) {
			
			/* If the data retrieval was successful, display the account page */
			if (result) {
				/* Assign the result of the database retrieval to the variable appLogo */
				let appLogo = result;

				/* If the user is using an administrator account, display the page accordingly */
				if (req.session.isAdmin == true) {
					
					/* Assign the needed details of the item catalog documents to the variable projection */
					let projection = '_id name quantity description price commentIds pictures ratings numberSold visible';

					/* The needed details of all catalog items are retrieved to be displayed on the landing page */
					db.findMany(CatalogItem, {}, projection, function(result) {
						/* If the data retrieval is successful, the landing page is displayed */
						if (result != null) {
							/* Store data in parallel arrays (to allow for processing); the first set of arrays
							 * contains the data of active items (i.e., those that can be purchased by customers) 
							 */
							let activeIds = [];
							let activeNames = [];
							let activeQuantities = [];
							let activeDescriptions = [];
							let activePrices = [];
							let activeComments = [];
							let activePictures = [];
							let activeRatings = [];
							let activeAveRatings = [];
							let activeNumberSold = [];
							let activeVisibilities = [];

							/* The second set of arrays contains the data of hidden items */
							let hiddenIds = [];
							let hiddenNames = [];
							let hiddenQuantities = [];
							let hiddenDescriptions = [];
							let hiddenPrices = [];
							let hiddenComments = [];
							let hiddenPictures = [];
							let hiddenRatings = [];
							let hiddenAveRatings = [];
							let hiddenNumberSold = [];
							let hiddenVisibilities = [];

							/* The third set of arrays contains the data of depleted items 
							 * (i.e., those that are no longer in stock)
							 */
							let depletedIds = [];
							let depletedNames = [];
							let depletedQuantities = [];
							let depletedDescriptions = [];
							let depletedPrices = [];
							let depletedComments = [];
							let depletedPictures = [];
							let depletedRatings = [];
							let depletedAveRatings = [];
							let depletedNumberSold = [];
							let depletedVisibilities = [];

							/* Assign the results of the database retrieval to the variable items */
							let items = result;
							/* For each catalog item, push each detail to its respective array if the item
							 * has been made visible and is not depleted 
							 */
							for (let i = 0; i < items.length; i++) {
								if (items[i].visible == false) {
									hiddenIds.push(items[i]._id);
									hiddenNames.push(items[i].name);
									hiddenQuantities.push(items[i].quantity);
									hiddenDescriptions.push(items[i].description);
									hiddenPrices.push(items[i].price);
									hiddenNumberSold.push(items[i].numberSold);
									/* Currently, commentIds are stored as comments (will change to actual comments once comment functionality has been implemented) */
									hiddenComments.push(items[i].commentIds);
									hiddenPictures.push(items[i].pictures[0]);
									hiddenRatings.push(items[i].ratings);
									hiddenVisibilities.push(items[i].visible);

									/* Average rating is displayed as 0 if there are no ratings yet */
									if (items[i].ratings.length == 0) {
										hiddenAveRatings.push(0);

									/* Otherwise, the average rating is computed and displayed */
									} else {
										var totalRating = 0;

										for (let j = 0; j < items[i].ratings.length; j++) {
											totalRating += items[i].ratings[j];
										}

										hiddenAveRatings.push(totalRating / items[i].ratings.length);
									}
								} else if (items[i].quantity <= 0) {
									depletedIds.push(items[i]._id);
									depletedNames.push(items[i].name);
									depletedQuantities.push(items[i].quantity);
									depletedDescriptions.push(items[i].description);
									depletedPrices.push(items[i].price);
									depletedNumberSold.push(items[i].numberSold);
									/* Currently, commentIds are stored as comments (will change to actual comments once comment functionality has been implemented) */
									depletedComments.push(items[i].commentIds);
									depletedPictures.push(items[i].pictures[0]);
									depletedRatings.push(items[i].ratings);
									depletedVisibilities.push(items[i].visible);

									/* Average rating is displayed as 0 if there are no ratings yet */
									if (items[i].ratings.length == 0) {
										depletedAveRatings.push(0);

									/* Otherwise, the average rating is computed and displayed */
									} else {
										var totalRating = 0;

										for (let j = 0; j < items[i].ratings.length; j++) {
											totalRating += items[i].ratings[j];
										}

										depletedAveRatings.push(totalRating / items[i].ratings.length);
									}
								} else {
									activeIds.push(items[i]._id);
									activeNames.push(items[i].name);
									activeQuantities.push(items[i].quantity);
									activeDescriptions.push(items[i].description);
									activePrices.push(items[i].price);
									activeNumberSold.push(items[i].numberSold);
									/* Currently, commentIds are stored as comments (will change to actual comments once comment functionality has been implemented) */
									activeComments.push(items[i].commentIds);
									activePictures.push(items[i].pictures[0]);
									activeRatings.push(items[i].ratings);
									activeVisibilities.push(items[i].visible);

									/* Average rating is displayed as 0 if there are no ratings yet */
									if (items[i].ratings.length == 0) {
										activeAveRatings.push(0);

									/* Otherwise, the average rating is computed and displayed */
									} else {
										var totalRating = 0;

										for (let j = 0; j < items[i].ratings.length; j++) {
											totalRating += items[i].ratings[j];
										}

										activeAveRatings.push(totalRating / items[i].ratings.length);
									}
								}
							}

							let details = {
								style: 'account',
								logo: appLogo.logo,
								userFlag: true,
								adminFlag: true,
								username: req.session.username,
								isAdmin: req.session.isAdmin,

								activeIds: activeIds,
								activeNames: activeNames,
								activeQuantities: activeQuantities,
								activeDescriptions: activeDescriptions,
								activePrices: activePrices,
								activeComments: activeComments,
								activePictures: activePictures,
								activeAveRatings: activeAveRatings,
								activeNumberSold: activeNumberSold,
								activeProductType: 1,
								activeVisibilities: activeVisibilities,

								hiddenIds: hiddenIds,
								hiddenNames: hiddenNames,
								hiddenQuantities: hiddenQuantities,
								hiddenDescriptions: hiddenDescriptions,
								hiddenPrices: hiddenPrices,
								hiddenComments: hiddenComments,
								hiddenPictures: hiddenPictures,
								hiddenAveRatings: hiddenAveRatings,
								hiddenNumberSold: hiddenNumberSold,
								hiddenProductType: 2,
								hiddenVisibilities: hiddenVisibilities,

								depletedIds: depletedIds,
								depletedNames: depletedNames,
								depletedQuantities: depletedQuantities,
								depletedDescriptions: depletedDescriptions,
								depletedPrices: depletedPrices,
								depletedComments: depletedComments,
								depletedPictures: depletedPictures,
								depletedAveRatings: depletedAveRatings,
								depletedNumberSold: depletedNumberSold,
								depletedProductType: 3,
								depletedVisibilities: depletedVisibilities
							}

							res.render('admin-products-manager', details);
						}
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
	 * Gets the admin clients manager page
	 * 
	 * @param req object that contains information on the HTTP request from the client
	 * @param res object that contains information on the HTTP response from the server 
	 */
	getAccountAdminClientsManager: function(req, res) {

		/* Prepare a query for the web application logo */
		let query = {id: 0};
		
		/* Retrieve the web application logo from the database */
		db.findOne(Display, query, '', function(result) {
			
			/* If the data retrieval was successful, display the account page */
			if (result) {

				/* If the user is using an administrator account, display the nav bar accordingly */
				if (req.session.isAdmin == true) {
					let details = {
						style: 'account',
						logo: result.logo,
						userFlag: true,
						adminFlag: true,
						username: req.session.username,
						isAdmin: req.session.isAdmin
					}

					res.render('admin-clients-manager', details);

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
	},
}

module.exports = accountController;