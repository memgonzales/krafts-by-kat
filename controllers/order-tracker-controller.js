/* Controller for handling the products manager page */

/* The db file, display schema, and catalog, client, order, and order item schemas are used for the account page */
const db = require('../models/db.js');
const Display = require('../models/display-schema.js');
const CatalogItem = require('../models/catalog-item-schema.js');
const Client = require('../models/client-schema.js');
const Order = require('../models/order-schema.js');
const OrderItem = require('../models/order-item-schema.js');

const maxNumItems = 5;
const imagePlaceholder = '/img/placeholder/no-image.png';

const orderTrackerController = {
    /**
	 * Gets the admin pending orders page
	 * 
	 * @param req object that contains information on the HTTP request from the client
	 * @param res object that contains information on the HTTP response from the server 
	 */
	getAccountAdminOrdersPending: function(req, res) {

		/* Prepare a query for the web application logo */
		let query = {id: 0};
		
		/* Retrieve the web application logo from the database */
		db.findOne(Display, query, '', function(result) {
			
			/* If the data retrieval was successful, display the admin pending orders page */
			if (result) {
				appLogo = result;

				/* If the user is using an administrator account, display the nav bar accordingly */
				if (req.session.isAdmin == true) {
					
					/* Store the order data in parallel arrays */
					let orderIds = [];
					let orderNames = [];
					let orderStatuses = [];
					let preferredDeliveryDates = [];
					let orderPrices = [];

					/* Use boolean arrays to indicate the statuses of orders; these are used as flags 
					 * for the hbs rendering of the page
					 */
					let pendingOrders = [];

					/* Retrieve all orders that have been submitted */
					let query = {status: 'Pending'};
					let projection = '_id name status preferredDeliveryDate price';

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
							
							orderStatuses[i] = result[i].status;

                            /* As all of the retrieved orders from the database are pending orders, assign the
                             * statuses of all retrieved orders accordingly 
                             */
                            pendingOrders[i] = true;

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
							orderStatuses: orderStatuses,
							preferredDeliveryDates: preferredDeliveryDates,
							orderPrices: orderPrices,

							pendingOrders: pendingOrders
						}
	
						res.render('orders-pending', details);
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
	 * Gets the admin accepted orders page
	 * 
	 * @param req object that contains information on the HTTP request from the client
	 * @param res object that contains information on the HTTP response from the server 
	 */
	getAccountAdminOrdersAccepted: function(req, res) {

		/* Prepare a query for the web application logo */
		let query = {id: 0};
		
		/* Retrieve the web application logo from the database */
		db.findOne(Display, query, '', function(result) {
			
			/* If the data retrieval was successful, display the admin accepted orders page */
			if (result) {
				appLogo = result;

				/* If the user is using an administrator account, display the nav bar accordingly */
				if (req.session.isAdmin == true) {
					
					/* Store the order data in parallel arrays */
					let orderIds = [];
					let orderNames = [];
					let orderStatuses = [];
					let preferredDeliveryDates = [];
					let orderPrices = [];

					/* Use boolean arrays to indicate the statuses of orders; these are used as flags 
					 * for the hbs rendering of the page
					 */
					let acceptedOrders = [];

					/* Retrieve all orders that have been submitted */
					let query = {status: 'Accepted'};
					let projection = '_id name status preferredDeliveryDate price';

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
							
							orderStatuses[i] = result[i].status;

                            /* As all of the retrieved orders from the database are accepted orders, assign the
                             * statuses of all retrieved orders accordingly 
                             */
                            acceptedOrders[i] = true;

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
							orderStatuses: orderStatuses,
							preferredDeliveryDates: preferredDeliveryDates,
							orderPrices: orderPrices,

							acceptedOrders: acceptedOrders
						}
	
						res.render('orders-accepted', details);
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
	 * Gets the admin en route orders page
	 * 
	 * @param req object that contains information on the HTTP request from the client
	 * @param res object that contains information on the HTTP response from the server 
	 */
	getAccountAdminOrdersEnRoute: function(req, res) {

		/* Prepare a query for the web application logo */
		let query = {id: 0};
		
		/* Retrieve the web application logo from the database */
		db.findOne(Display, query, '', function(result) {
			
			/* If the data retrieval was successful, display the admin en route orders page */
			if (result) {
				appLogo = result;

				/* If the user is using an administrator account, display the nav bar accordingly */
				if (req.session.isAdmin == true) {
					
					/* Store the order data in parallel arrays */
					let orderIds = [];
					let orderNames = [];
					let orderStatuses = [];
					let preferredDeliveryDates = [];
					let orderPrices = [];

					/* Use boolean arrays to indicate the statuses of orders; these are used as flags 
					 * for the hbs rendering of the page
					 */
					let enRouteOrders = [];

					/* Retrieve all orders that have been submitted */
					let query = {status: 'En Route'};
					let projection = '_id name status preferredDeliveryDate price';

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
							
							orderStatuses[i] = result[i].status;

                            /* As all of the retrieved orders from the database are en route orders, assign the
                             * statuses of all retrieved orders accordingly 
                             */
                            enRouteOrders[i] = true;

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
							orderStatuses: orderStatuses,
							preferredDeliveryDates: preferredDeliveryDates,
							orderPrices: orderPrices,

							enRouteOrders: enRouteOrders
						}
	
						res.render('orders-en-route', details);
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
	 * Gets the admin delivered orders page
	 * 
	 * @param req object that contains information on the HTTP request from the client
	 * @param res object that contains information on the HTTP response from the server 
	 */
	getAccountAdminOrdersDelivered: function(req, res) {

		/* Prepare a query for the web application logo */
		let query = {id: 0};
		
		/* Retrieve the web application logo from the database */
		db.findOne(Display, query, '', function(result) {
			
			/* If the data retrieval was successful, display the admin delivered orders page */
			if (result) {
				appLogo = result;

				/* If the user is using an administrator account, display the nav bar accordingly */
				if (req.session.isAdmin == true) {
					
					/* Store the order data in parallel arrays */
					let orderIds = [];
					let orderNames = [];
					let orderStatuses = [];
					let preferredDeliveryDates = [];
					let orderPrices = [];

					/* Use boolean arrays to indicate the statuses of orders; these are used as flags 
					 * for the hbs rendering of the page
					 */
					let deliveredOrders = [];

					/* Retrieve all orders that have been submitted */
					let query = {status: 'En Route'};
					let projection = '_id name status preferredDeliveryDate price';

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
							
							orderStatuses[i] = result[i].status;

                            /* As all of the retrieved orders from the database are delivered orders, assign the
                             * statuses of all retrieved orders accordingly 
                             */
                            deliveredOrders[i] = true;

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
							orderStatuses: orderStatuses,
							preferredDeliveryDates: preferredDeliveryDates,
							orderPrices: orderPrices,

							deliveredOrders: deliveredOrders
						}
	
						res.render('orders-delivered', details);
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
	 * Sets the status of an order to "Unsubmitted"
	 * 
	 * @param req object that contains information on the HTTP request from the client
	 * @param res object that contains information on the HTTP response from the server 
	 */
	getCancelOrder: function(req, res) {

		/* Prepare a query for the web application logo */
		let query = {id: 0};
		
		/* Retrieve the web application logo from the database */
		db.findOne(Display, query, '', function(result) {
			
			/* If the data retrieval was successful, display the admin delivered orders page */
			if (result) {
				appLogo = result;

				/* If the user is registered, cancel the selected order */
				if (req.session.username != undefined) {

                    /* Set the status of the order with the corresponding ObjectID to "Unsubmitted" */
					let filter = {_id: db.convertToObjectId(req.params.id)};
                    let update = {status: "Unsubmitted"};
					
                    db.updateOne(Order, filter, update, function(flag) {
                        
                        /* Redirect the user to their proper order pages (depending on whether they are 
                         * the admin) 
                         */
                        if (req.session.isAdmin == true) {
                            res.redirect('/account/admin/orders');
                        } else {
                            res.redirect('/account/myOrders');
                        }
                    });

				/* If the user is not registered, redirect them to the landing page */
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

module.exports = orderTrackerController;