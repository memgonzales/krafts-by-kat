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
					let query = {status: 'Delivered'};
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
	},

    /**
	 * Sets the status of an order to "Accepted"
	 * 
	 * @param req object that contains information on the HTTP request from the client
	 * @param res object that contains information on the HTTP response from the server 
	 */
	getSetOrderAccepted: function(req, res) {
        /* If the user is the admin, update the quantities of the ordered products and set the 
            * status of the order to "Accepted" 
            */
        if (req.session.isAdmin == true) {

            /* Store the passed ObjectID as the order ID */
            let orderId = req.params.id;

            /* Retrieve the order corresponding to the passed order ID */
            let query = {_id: db.convertToObjectId(orderId)};
            let projection = '_id name username orderItemIds status';

            db.findOne(Order, query, projection, function(result) {

                /* Store the ObjectIDs of the order items as the order item IDs */
                let orderItemIds = result.orderItemIds;

                /* Retrieve the data of the order items in the order */
                let orderItemQuery = {_id: {$in: orderItemIds}};
                let orderItemProjection = '_id productId quantity';

                db.findMany(OrderItem, orderItemQuery, orderItemProjection, function(result) {
                    
                       /* Store the ObjectIDs of the ordered products and the quantities ordered of 
                        * each order item in parallel arrays
                        */
                    let orderItemProductIds = [];
                    let orderItemQuantities = [];

                    for (let i = 0; i < result.length; i++) {
                        orderItemProductIds[i] = result[i].productId;
                        orderItemQuantities[i] = result[i].quantity;
                    }

                    /* Retrieve the data of the catalog items that have been ordered */
                    let productQuery = {_id: {$in: orderItemProductIds}};
                    let productProjection = '_id name quantity numberSold';

                    db.findMany(CatalogItem, productQuery, productProjection, function(result) {
                           /* Store the ObjectIDs of the ordered products, their current quantities,
                            * and their amounts sold in parallel arrays
                            */
                        let productIds = [];
                        let productQuantities = [];
                        let productNumbersSold = [];

                        for (let i = 0; i < result.length; i++) {
                            productIds[i] = result[i]._id;
                            productQuantities[i] = result[i].quantity;
                            productNumbersSold[i] = result[i].numberSold;
                        }

                           /* For each product ordered, decrease its quantity and increase its number sold by 
                            * the amount ordered in the order items 
                            */
                        for (let i = 0; i < productIds.length; i++) {
                            for (let j = 0; j < orderItemProductIds.length; j++) {
                                if (productIds[i] == orderItemProductIds[j]) {
                                    productQuantities[i] = productQuantities[i] - orderItemQuantities[j];
                                    productNumbersSold[i] = productNumbersSold[i] + orderItemQuantities[j];
                                }
                            }
                        }

                        /* Update the product quantities and numbers sold in the database */
                        for (let i = 0; i < productIds.length; i++) {
                            let productFilter = {_id: productIds[i]};
                            let productUpdate = {
                                quantity: productQuantities[i],
                                numberSold: productNumbersSold[i]
                            };

                            db.updateOneIterative(CatalogItem, productFilter, productUpdate);
                        }

                        /* Set the status of the order to "Accepted" */
                        let orderFilter = {_id: db.convertToObjectId(orderId)};
                        let orderUpdate = {status: "Accepted"};

                        db.updateOne(Order, orderFilter, orderUpdate, function(flag) {
                            /* Redirect the user to the list of accepted orders */
                            res.redirect('/account/admin/orders/accepted');
                        });
                    });
                });
            });

           /* If the user is not the admin, redirect them to the landing page; only the admin can
            * accept orders
            */
        } else {
            res.redirect('/');
        }	
	},

    /**
	 * Sets the status of an order to "En Route"
	 * 
	 * @param req object that contains information on the HTTP request from the client
	 * @param res object that contains information on the HTTP response from the server 
	 */
	getSetOrderEnRoute: function(req, res) {

        /* If the user is the admin, update the status of the selected order */
        if (req.session.isAdmin == true) {

            /* Set the status of the order with the corresponding ObjectID to "En Route" */
            let filter = {_id: db.convertToObjectId(req.params.id)};
            let update = {status: "En Route"};
            
            db.updateOne(Order, filter, update, function(flag) {
                
                /* Redirect the user to the en route orders page */
                res.redirect('/account/admin/orders/enRoute');
            });

        /* If the user is not the admin, redirect them to the landing page; only the admin can change the 
         * status of an order to "En Route" 
         */
        } else {
            res.redirect('/');
        }	
	},

    /**
	 * Sets the status of an order to "Delivered"
	 * 
	 * @param req object that contains information on the HTTP request from the client
	 * @param res object that contains information on the HTTP response from the server 
	 */
	getSetOrderDelivered: function(req, res) {

        /* If the user is registered, update the status of the selected order */
        if (req.session.username != undefined) {

            /* Set the status of the order with the corresponding ObjectID to "Delivered" */
            let filter = {_id: db.convertToObjectId(req.params.id)};
            let update = {status: "Delivered"};
            
            db.updateOne(Order, filter, update, function(flag) {
                
                /* Redirect the user to the en route orders page */
                res.redirect('/account/admin/orders/delivered');
            });

        /* If the user is not registered, redirect them to the landing page */
        } else {
            res.redirect('/');
        }	
	},
}

module.exports = orderTrackerController;