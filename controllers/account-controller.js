/* Controller for handling the account page */

/* The db file, display schema, client schema, and catalog schema are used for the account page */
const db = require('../models/db.js');
const Display = require('../models/display-schema.js');
const Client = require('../models/client-schema.js');
const CatalogItem = require('../models/catalog-item-schema.js');
const Order = require('../models/order-schema.js');

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
						username: req.session.username
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
						username: req.session.username
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
	getAccountOrders: function(req, res) {

		/* Prepare a query for the web application logo */
		let query = {id: 0};
		
		/* Retrieve the web application logo from the database */
		db.findOne(Display, query, '', function(result) {
			
			/* If the data retrieval was successful, display the account page */
			if (result) {
				appLogo = result;

				/* If the user is using an administrator account, redirect them to the admin view */
				if (req.session.isAdmin == true) {
					res.redirect('/account/admin/orders');

				/* If the user is not registered, redirect them to the landing page */
				} else {
					if (req.session.username == undefined) {
						res.redirect('/');

					/* If the user is using a regular account, display the orders page accordingly */	
					} else {
					
						/* Store the order data in parallel arrays */
						let orderIds = [];
						let orderNames = [];
						let orderUsernames = [];
						let orderStatuses = [];
						let preferredDeliveryDates = [];
						let orderPrices = [];

						/* Use boolean arrays to indicate the statuses of orders; these are used as flags 
						 * for the hbs rendering of the page
						 */
						let currentOrders = [];
						let unsubmittedOrders = [];
						let pendingOrders = [];
						let acceptedOrders = [];
						let enRouteOrders = [];
						let deliveredOrders = [];

						/* Retrieve the ObjectID of the user's current order */
						let query = {username: req.session.username};
						let projection = 'username currentOrder';

						db.findOne(Client, query, projection, function(result) {
							let currentOrder = result.currentOrder;

							/* Retrieve all orders made by the user */
							let orderQuery = {user: req.session.username};
							let orderProjection = '_id name user status preferredDeliveryDate price';

							db.findMany(Order, orderQuery, orderProjection, function(result) {
								
								/* Store the retrieved data in the prepared parallel arrays */
								for (let i = 0; i < result.length; i++) {
									orderIds[i] = result[i]._id;

									/* Display the order name as "Unnamed Order" if the user did not enter an order name */
									if (result[i].name == "") {
										orderNames[i] = "Unnamed Order";
									} else {
										orderNames[i] = result[i].name;
									}

									/* Append the string "(Current Order)" to the order name of the user's current order and 
									 * mark it as the current order
									 */
									if (orderIds[i] == currentOrder) {
										orderNames[i] = orderNames[i] + " (Current Order)";
										currentOrders[i] = true;
									} else {
										currentOrders[i] = false;
									}
									
									orderUsernames[i] = result[i].user;
									orderStatuses[i] = result[i].status;

									/* Assign the boolean values of the order status arrays depending on the retrieved order status */
									if (orderStatuses[i] == "Unsubmitted") {
										unsubmittedOrders[i] = true;
										pendingOrders[i] = false;
										acceptedOrders[i] = false;
										enRouteOrders[i] = false;
										deliveredOrders[i] = false;
									} else if (orderStatuses[i] == "Pending") {
										unsubmittedOrders[i] = false;
										pendingOrders[i] = true;
										acceptedOrders[i] = false;
										enRouteOrders[i] = false;
										deliveredOrders[i] = false;
									} else if (orderStatuses[i] == "Accepted") {
										unsubmittedOrders[i] = false;
										pendingOrders[i] = false;
										acceptedOrders[i] = true;
										enRouteOrders[i] = false;
										deliveredOrders[i] = false;
									} else if (orderStatuses[i] == "En Route") {
										unsubmittedOrders[i] = false;
										pendingOrders[i] = false;
										acceptedOrders[i] = false;
										enRouteOrders[i] = true;
										deliveredOrders[i] = false;
									} else {
										unsubmittedOrders[i] = false;
										pendingOrders[i] = false;
										acceptedOrders[i] = false;
										enRouteOrders[i] = false;
										deliveredOrders[i] = true;
									}

									orderPrices[i] = result[i].price;

									/* Format the display of the preferred delivery date from the Date object
									 * stored in the database
									 */
									let month = result[i].preferredDeliveryDate.getMonth() + 1;
									let formattedMonth = month;
									if (month.toString().length < 2) {
										formattedMonth = "0" + month.toString();
									}

									let date = result[i].preferredDeliveryDate.getDate();
									let formattedDate = date;
									if (date.toString().length < 2) {
										formattedDate = "0" + date.toString();
									}

									let year = result[i].preferredDeliveryDate.getFullYear();

									preferredDeliveryDates[i] = formattedMonth + "/" + formattedDate + "/" + year;
								}

								let details = {
									style: 'account',
									logo: appLogo.logo,
									userFlag: true,
									adminFlag: false,
									username: req.session.username,

									orderIds: orderIds,
									orderNames: orderNames,
									orderUsernames: orderUsernames,
									orderStatuses: orderStatuses,
									preferredDeliveryDates: preferredDeliveryDates,
									orderPrices: orderPrices,

									currentOrders: currentOrders,
									unsubmittedOrders: unsubmittedOrders,
									pendingOrders: pendingOrders,
									acceptedOrders: acceptedOrders,
									enRouteOrders: enRouteOrders,
									deliveredOrders: deliveredOrders
								}

								res.render('user-my-orders', details);
							});
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
			
			/* If the data retrieval was successful, display the admin orders page */
			if (result) {
				appLogo = result;

				/* If the user is using an administrator account, display the nav bar accordingly */
				if (req.session.isAdmin == true) {
					
					/* Store the order data in parallel arrays */
					let orderIds = [];
					let orderNames = [];
					let orderUsernames = [];
					let orderStatuses = [];
					let preferredDeliveryDates = [];
					let orderPrices = [];

					/* Use boolean arrays to indicate the statuses of orders; these are used as flags 
					 * for the hbs rendering of the page
					 */
					let pendingOrders = [];
					let acceptedOrders = [];
					let enRouteOrders = [];
					let deliveredOrders = [];

					/* Retrieve all orders that have been submitted */
					let acceptedStatuses = ['Pending', 'Accepted', 'En Route', 'Delivered'];
					let query = {status: {$in: acceptedStatuses}};
					let projection = '_id user name status preferredDeliveryDate price';

					db.findMany(Order, query, projection, function(result) {
						
						/* Store the retrieved data in the prepared parallel arrays */
						for (let i = 0; i < result.length; i++) {
							orderIds[i] = result[i]._id;

							/* Display the order name as "Unnamed Order" if the user did not enter an order name */
							if (result[i].name == "") {
								orderNames[i] = "Unnamed Order";
							} else {
								orderNames[i] = result[i].name;
							}
							
							orderUsernames[i] = result[i].user;
							orderStatuses[i] = result[i].status;

							/* Assign the boolean values of the order status arrays depending on the retrieved order status */
							if (orderStatuses[i] == "Pending") {
								pendingOrders[i] = true;
								acceptedOrders[i] = false;
								enRouteOrders[i] = false;
								deliveredOrders[i] = false;
							} else if (orderStatuses[i] == "Accepted") {
								pendingOrders[i] = false;
								acceptedOrders[i] = true;
								enRouteOrders[i] = false;
								deliveredOrders[i] = false;
							} else if (orderStatuses[i] == "En Route") {
								pendingOrders[i] = false;
								acceptedOrders[i] = false;
								enRouteOrders[i] = true;
								deliveredOrders[i] = false;
							} else {
								pendingOrders[i] = false;
								acceptedOrders[i] = false;
								enRouteOrders[i] = false;
								deliveredOrders[i] = true;
							}

							orderPrices[i] = result[i].price;

							/* Format the display of the preferred delivery date from the Date object
							 * stored in the database
							 */
							let month = result[i].preferredDeliveryDate.getMonth() + 1;
							let formattedMonth = month;
							if (month.toString().length < 2) {
								formattedMonth = "0" + month.toString();
							}

							let date = result[i].preferredDeliveryDate.getDate();
							let formattedDate = date;
							if (date.toString().length < 2) {
								formattedDate = "0" + date.toString();
							}

							let year = result[i].preferredDeliveryDate.getFullYear();

							preferredDeliveryDates[i] = formattedMonth + "/" + formattedDate + "/" + year;
						}

						let details = {
							style: 'account',
							logo: appLogo.logo,
							userFlag: true,
							adminFlag: true,
							username: req.session.username,

							orderIds: orderIds,
							orderNames: orderNames,
							orderUsernames: orderUsernames,
							orderStatuses: orderStatuses,
							preferredDeliveryDates: preferredDeliveryDates,
							orderPrices: orderPrices,

							pendingOrders: pendingOrders,
							acceptedOrders: acceptedOrders,
							enRouteOrders: enRouteOrders,
							deliveredOrders: deliveredOrders
						}
	
						res.render('admin-orders', details);
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
						username: req.session.username
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
					
					/* Retrieve all visible and hidden products */
					let visibleStatuses = ['Visible', 'Hidden'];
					let query = {visible: {$in: visibleStatuses}};

					/* Assign the needed details of the item catalog documents to the variable projection */
					let projection = '_id name quantity description price commentIds pictures ratings numberSold visible';

					/* The needed details of all catalog items are retrieved to be displayed on the landing page */
					db.findMany(CatalogItem, query, projection, function(result) {
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
								if (items[i].visible == 'Hidden') {
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
									hiddenVisibilities.push(false);

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
									depletedVisibilities.push(false);

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
									activeVisibilities.push(true);

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
						username: req.session.username
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
	}
}

module.exports = accountController;