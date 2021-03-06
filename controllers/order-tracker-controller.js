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
					let orderUsernames = [];
					let orderStatuses = [];
					let preferredDeliveryDates = [];
					let orderPrices = [];

					/* Use boolean arrays to indicate the statuses of orders; these are used as flags 
					 * for the hbs rendering of the page
					 */
					let pendingOrders = [];

					/* Retrieve all orders that have been submitted */
					let query = {status: 'Pending'};
					let projection = '_id name user status preferredDeliveryDate price';

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
							orderUsernames: orderUsernames,
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
					let orderUsernames = [];
					let orderStatuses = [];
					let preferredDeliveryDates = [];
					let orderPrices = [];

					/* Use boolean arrays to indicate the statuses of orders; these are used as flags 
					 * for the hbs rendering of the page
					 */
					let acceptedOrders = [];

					/* Retrieve all orders that have been submitted */
					let query = {status: 'Accepted'};
					let projection = '_id name user status preferredDeliveryDate price';

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
							orderUsernames: orderUsernames,
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
					let orderUsernames = [];
					let orderStatuses = [];
					let preferredDeliveryDates = [];
					let orderPrices = [];

					/* Use boolean arrays to indicate the statuses of orders; these are used as flags 
					 * for the hbs rendering of the page
					 */
					let enRouteOrders = [];

					/* Retrieve all orders that have been submitted */
					let query = {status: 'En Route'};
					let projection = '_id name user status preferredDeliveryDate price';

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
							orderUsernames: orderUsernames,
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
					let orderUsernames = [];
					let orderStatuses = [];
					let preferredDeliveryDates = [];
					let orderPrices = [];

					/* Use boolean arrays to indicate the statuses of orders; these are used as flags 
					 * for the hbs rendering of the page
					 */
					let deliveredOrders = [];

					/* Retrieve all orders that have been submitted */
					let query = {status: 'Delivered'};
					let projection = '_id name user status preferredDeliveryDate price';

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
							orderUsernames: orderUsernames,
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
	 * Gets the user unsubmitted orders page
	 * 
	 * @param req object that contains information on the HTTP request from the client
	 * @param res object that contains information on the HTTP response from the server 
	 */
	  getAccountOrdersUnsubmitted: function(req, res) {

		/* Prepare a query for the web application logo */
		let query = {id: 0};
		
		/* Retrieve the web application logo from the database */
		db.findOne(Display, query, '', function(result) {
			
			/* If the data retrieval was successful, display the admin pending orders page */
			if (result) {
				appLogo = result;

				/* If the user is using an administrator account, redirect them to the landing page; the
				 * administrator cannot view the unsubmitted orders of users
				 */
				if (req.session.isAdmin == true) {
					res.redirect('/');

				/* If the user is not registered, redirect them to the landing page */
				} else {
					if (req.session.username == undefined) {
						res.redirect('/');

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

						/* Retrieve the current order of the user */
						let query = {username: req.session.username};
						let projection = 'username currentOrder';

						db.findOne(Client, query, projection, function(result) {
							let currentOrder = result.currentOrder;

							/* Retrieve all the unsubmitted and cancelled orders of the user */
							let unsubmittedStatuses = ['Unsubmitted', 'Cancelled'];
							let orderQuery = {
								user: req.session.username,
								status: {$in : unsubmittedStatuses}
							};
				
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

									/* Append the string "(Current Order)" to the order name of the user's current order 
									 * and mark it as the current order
									 */
									if (orderIds[i] == currentOrder) {
										orderNames[i] = orderNames[i] + " (Current Order)";
										currentOrders[i] = true;
									} else {
										currentOrders[i] = false;
									}
									
									orderUsernames[i] = result[i].user;
									orderStatuses[i] = result[i].status;

									/* As all of the retrieved orders from the database are unsubmitted orders, assign the
									 * statuses of all retrieved orders accordingly 
									 */
									unsubmittedOrders[i] = true;

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
									unsubmittedOrders: unsubmittedOrders
								}
			
								res.render('orders-unsubmitted-user', details);
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
	 * Gets the user pending orders page
	 * 
	 * @param req object that contains information on the HTTP request from the client
	 * @param res object that contains information on the HTTP response from the server 
	 */
	 getAccountOrdersPending: function(req, res) {

		/* Prepare a query for the web application logo */
		let query = {id: 0};
		
		/* Retrieve the web application logo from the database */
		db.findOne(Display, query, '', function(result) {
			
			/* If the data retrieval was successful, display the admin pending orders page */
			if (result) {
				appLogo = result;

				/* If the user is using an administrator account, redirect them to the admin view
				 */
				if (req.session.isAdmin == true) {
					res.redirect('/account/admin/orders/pending');

				/* If the user is not registered, redirect them to the landing page */
				} else {
					if (req.session.username == undefined) {
						res.redirect('/');

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
						let pendingOrders = [];

						/* Retrieve all the pending orders of the user */
						let orderQuery = {
							user: req.session.username,
							status: 'Pending'
						};
			
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

								orderUsernames[i] = result[i].user;
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
								adminFlag: false,
								username: req.session.username,

								orderIds: orderIds,
								orderNames: orderNames,
								orderUsernames: orderUsernames,
								orderStatuses: orderStatuses,
								preferredDeliveryDates: preferredDeliveryDates,
								orderPrices: orderPrices,

								pendingOrders: pendingOrders
							}
		
							res.render('orders-pending-user', details);
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
	 * Gets the user accepted orders page
	 * 
	 * @param req object that contains information on the HTTP request from the client
	 * @param res object that contains information on the HTTP response from the server 
	 */
	 getAccountOrdersAccepted: function(req, res) {

		/* Prepare a query for the web application logo */
		let query = {id: 0};
		
		/* Retrieve the web application logo from the database */
		db.findOne(Display, query, '', function(result) {
			
			/* If the data retrieval was successful, display the admin pending orders page */
			if (result) {
				appLogo = result;

				/* If the user is using an administrator account, redirect them to the admin view
				 */
				if (req.session.isAdmin == true) {
					res.redirect('/account/admin/orders/accepted');

				/* If the user is not registered, redirect them to the landing page */
				} else {
					if (req.session.username == undefined) {
						res.redirect('/');

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
						let acceptedOrders = [];

						/* Retrieve all the accepted orders of the user */
						let orderQuery = {
							user: req.session.username,
							status: 'Accepted'
						};
			
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

								orderUsernames[i] = result[i].user;
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
								adminFlag: false,
								username: req.session.username,

								orderIds: orderIds,
								orderNames: orderNames,
								orderUsernames: orderUsernames,
								orderStatuses: orderStatuses,
								preferredDeliveryDates: preferredDeliveryDates,
								orderPrices: orderPrices,

								acceptedOrders: acceptedOrders
							}
		
							res.render('orders-accepted-user', details);
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
	 * Gets the user en route orders page
	 * 
	 * @param req object that contains information on the HTTP request from the client
	 * @param res object that contains information on the HTTP response from the server 
	 */
	 getAccountOrdersEnRoute: function(req, res) {

		/* Prepare a query for the web application logo */
		let query = {id: 0};
		
		/* Retrieve the web application logo from the database */
		db.findOne(Display, query, '', function(result) {
			
			/* If the data retrieval was successful, display the admin pending orders page */
			if (result) {
				appLogo = result;

				/* If the user is using an administrator account, redirect them to the admin view
				 */
				if (req.session.isAdmin == true) {
					res.redirect('/account/admin/orders/enRoute');

				/* If the user is not registered, redirect them to the landing page */
				} else {
					if (req.session.username == undefined) {
						res.redirect('/');

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
						let enRouteOrders = [];

						/* Retrieve all the en route orders of the user */
						let orderQuery = {
							user: req.session.username,
							status: 'En Route'
						};
			
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

								orderUsernames[i] = result[i].user;
								orderStatuses[i] = result[i].status;

								/* As all of the retrieved orders from the database are accepted orders, assign the
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
								adminFlag: false,
								username: req.session.username,

								orderIds: orderIds,
								orderNames: orderNames,
								orderUsernames: orderUsernames,
								orderStatuses: orderStatuses,
								preferredDeliveryDates: preferredDeliveryDates,
								orderPrices: orderPrices,

								enRouteOrders: enRouteOrders
							}
		
							res.render('orders-en-route-user', details);
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
	 * Gets the user delivered orders page
	 * 
	 * @param req object that contains information on the HTTP request from the client
	 * @param res object that contains information on the HTTP response from the server 
	 */
	 getAccountOrdersDelivered: function(req, res) {

		/* Prepare a query for the web application logo */
		let query = {id: 0};
		
		/* Retrieve the web application logo from the database */
		db.findOne(Display, query, '', function(result) {
			
			/* If the data retrieval was successful, display the admin pending orders page */
			if (result) {
				appLogo = result;

				/* If the user is using an administrator account, redirect them to the admin view
				 */
				if (req.session.isAdmin == true) {
					res.redirect('/account/admin/orders/delivered');

				/* If the user is not registered, redirect them to the landing page */
				} else {
					if (req.session.username == undefined) {
						res.redirect('/');

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
						let deliveredOrders = [];

						/* Retrieve all the delivered orders of the user */
						let orderQuery = {
							user: req.session.username,
							status: 'Delivered'
						};
			
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

								orderUsernames[i] = result[i].user;
								orderStatuses[i] = result[i].status;

								/* As all of the retrieved orders from the database are accepted orders, assign the
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
								adminFlag: false,
								username: req.session.username,

								orderIds: orderIds,
								orderNames: orderNames,
								orderUsernames: orderUsernames,
								orderStatuses: orderStatuses,
								preferredDeliveryDates: preferredDeliveryDates,
								orderPrices: orderPrices,

								deliveredOrders: deliveredOrders
							}
		
							res.render('orders-delivered-user', details);
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
	 * Gets the details of a submitted order
	 * 
	 * @param req object that contains information on the HTTP request from the client
	 * @param res object that contains information on the HTTP response from the server 
	 */
	getViewSubmittedOrder: function(req, res) {

		/* Prepare a query for the web application logo */
		let query = {id: 0};
		
		/* Retrieve the web application logo from the database */
		db.findOne(Display, query, '', function(result) {
			
			/* If the data retrieval was successful, display the admin delivered orders page */
			if (result) {
				appLogo = result;

				/* If the user is registered, display the order details accordingly */
				if (req.session.username != undefined) {

					/* Retrieve the order details of the selected order */
					let query = {_id: db.convertToObjectId(req.params.id)};
					let projection = '_id name user companyName price status orderItemIds companyLogo preferredDeliveryDate';

					db.findOne(Order, query, projection, function(result) {

						/* Store the retrieved data in the order variable */
						let order = result;

						/* Display "Unnamed Order" if the user did not specify an order name */
						if (order.name == "") {
							order.name = "Unnamed Order";
						}

						/* Display "Unspecified Company" if the user did not specify a company */
						if (order.companyName == "") {
							order.companyName = "Unspecified Company";
						}

						/* Format the display of the preferred delivery date from the Date object
						 * stored in the database
						 */
						let month = order.preferredDeliveryDate.getMonth() + 1;
						let formattedMonth = month;
						if (month.toString().length < 2) {
							formattedMonth = "0" + month.toString();
						}

						let date = order.preferredDeliveryDate.getDate();
						let formattedDate = date;
						if (date.toString().length < 2) {
							formattedDate = "0" + date.toString();
						}

						let year = order.preferredDeliveryDate.getFullYear();

						let preferredDeliveryDate = formattedMonth + "/" + formattedDate + "/" + year;

						/* Retrieve the data for each of the order items in the order */
						let orderItemQuery = {_id: {$in: order.orderItemIds}};
						let orderItemProjection = '_id productId quantity packaging packagingColor packagingMessage itemColor itemText companyLogoLocation additionalInstructions orderItemPrice';

						db.findMany(OrderItem, orderItemQuery, orderItemProjection, function(result) {

							/* Store the retrieved data in the variable orderItems */
							let orderItems = result;

							/* Reassign the retrieved data to parallel arrays */
							let orderItemIds = [];
							let productIds = [];
							let quantities = [];
							let packagings = [];
							let packagingColors = [];
							let packagingMessages = [];
							let itemColors = [];
							let itemTexts = [];
							let companyLogoLocations = [];
							let additionalInstructions = [];
							let orderItemPrices = [];

							/* Store the product names corresponding to each of the product IDs in another array */
							let productNames = [];

							/* Store the order item data in the prepared parallel arrays */
							for (let i = 0; i < orderItems.length; i++) {
								orderItemIds[i] = orderItems[i]._id;
								productIds[i] = orderItems[i].productId;
								quantities[i] = orderItems[i].quantity;

								/* Format the packaging value based on the data stored in the database */
								switch(orderItems[i].packaging) {
									default:
										packagings[i] = "Kraft Box";
										break;
									case "mailer_box":
										packagings[i] = "Mailer Box";
										break;
									case "silk_pouch":
										packagings[i] = "Silk Pouch";
										break;
									case "packaging_canvas":
										packagings[i] = "packaging_canvas";
										break;
								}

								/* Format the packaging color value based on the data stored in the database */
								switch(orderItems[i].packagingColor) {
									default:
										packagingColors[i] = "Packaging Color 1";
										break;
									case "packaging_color_2":
										packagingColors[i] = "Packaging Color 2";
										break;
									case "packaging_color_3":
										packagingColors[i] = "Packaging Color 3";
										break;
									case "packaging_color_4":
										packagingColors[i] = "Packaging Color 4";
										break;
									case "packaging_color_5":
										packagingColors[i] = "Packaging Color 5";
										break;
								}

								/* Display "None" if the user did not enter a packaging message */
								if (orderItems[i].packagingMessage == "") {
									packagingMessages[i] = "None";
								} else {
									packagingMessages[i] = orderItems[i].packagingMessage;
								}
								
								/* Format the item color value based on the data stored in the database */
								switch(orderItems[i].itemColor) {
									default:
										itemColors[i] = "Item Color 1";
										break;
									case "item_color_2":
										itemColors[i] = "Item Color 2";
										break;
									case "item_color_3":
										itemColors[i] = "Item Color 3";
										break;
									case "item_color_4":
										itemColors[i] = "Item Color 4";
										break;
									case "item_color_5":
										itemColors[i] = "Item Color 5";
										break;
								}

								/* Display "None" if the user did not enter an item text */
								if (orderItems[i].itemText == "") {
									itemTexts[i] = "None";
								} else {
									itemTexts[i] = orderItems[i].itemText;
								}

								/* Format the company logo location value based on the data stored in the database;
								 * if the retrieved data is comprised of multiple entries, the user chose both packaging
								 * and item
								 */
								if (orderItems[i].companyLogoLocation.length > 1) {
									companyLogoLocations[i] = "Packaging and Item";

								/* Otherwise, format the company logo location value based on the values of the 
								 * retrieved data 
								 */
								} else if (orderItems[i].companyLogoLocation == "item") {
									companyLogoLocations[i] = "Item";
								} else if (orderItems[i].companyLogoLocation == "packaging") {
									companyLogoLocations[i] = "Packaging";
								} else {
									companyLogoLocations[i] = "None";
								}

								/* Display "None" if the user did not enter an additional instructions */
								if (orderItems[i].additionalInstructions == "") {
									additionalInstructions[i] = "None";
								} else {
									additionalInstructions[i] = orderItems[i].additionalInstructions;
								}

								orderItemPrices[i] = orderItems[i].orderItemPrice;
							}

							let productQuery = {_id: {$in: productIds}};
							let productProjection = '_id name';

							db.findMany(CatalogItem, productQuery, productProjection, function(result) {
								let productData = result;

								/* For each order item, match its product ID with the ObjectIDs of the retrieved
								 * catalog items. If the IDs match, store the product name in the prepared array.
							     * 
								 * This approach was used as the findMany() function only returns single instances
								 * of matching documents; thus, the number of retrieved documents may be less than
								 * the number of order items.
								 */
								for (let i = 0; i < orderItemIds.length; i++) {
									for (let j = 0; j < productData.length; j++) {
										if (productIds[i] == productData[j]._id) {
											productNames[i] = productData[j].name;
										}
									}
								}

								/* Retrieve the data of the user who made the order from the database */
								let userQuery = {username: order.user};
								let userProjection = 'username address';

								db.findOne(Client, userQuery, userProjection, function(result) {
									
									/* Store their address as the delivery address of the order */
									let deliveryAddress = result.address;

									/* The order items of an order are not reviewable until the order has
									 * been completed (i.e., delivered to the customer); after an order has
									 * been completed, the customer can then leave comments and ratings for
									 * the products corresponding to their order items
									 */
									let reviewable = false;
									if (order.status == "Delivered") {
										reviewable = true;
									}

									let details = {
										style: 'account',
										logo: appLogo.logo,
										userFlag: true,
										adminFlag: req.session.isAdmin,
										username: req.session.username,
			
										orderId: order._id,
										name: order.name,
										user: order.user,
										companyName: order.companyName,
										price: order.price,
										status: order.status,
										companyLogo: order.companyLogo,
										preferredDeliveryDate: preferredDeliveryDate,
										deliveryAddress: deliveryAddress,
		
										orderItemIds: orderItemIds,
										productIds: productIds,
										quantities: quantities,
										packagings: packagings,
										packagingColors: packagingColors,
										packagingMessages: packagingMessages,
										itemColors: itemColors,
										itemTexts: itemTexts,
										companyLogoLocations: companyLogoLocations,
										additionalInstructions: additionalInstructions,
										orderItemPrices: orderItemPrices,

										productNames: productNames,
										reviewable: reviewable
									}
				
									res.render('orders-item-focused', details);
								});
							});
						});
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

    /**
	 * Sets the status of an order to "Cancelled"
	 * 
	 * @param req object that contains information on the HTTP request from the client
	 * @param res object that contains information on the HTTP response from the server 
	 */
	getCancelOrder: function(req, res) {

        /* If the user is registered, cancel the selected order */
        if (req.session.username != undefined) {

            /* Set the status of the order with the corresponding ObjectID to "Cancelled" */
            let filter = {_id: db.convertToObjectId(req.params.id)};
            let update = {status: "Cancelled"};
            
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
	 * Sets the status of an order to "Pending"; this is equivalent to the "Place Order" functionality
	 * when the client does not add any order details before placing the order
	 * 
	 * @param req object that contains information on the HTTP request from the client
	 * @param res object that contains information on the HTTP response from the server 
	 */
	 getSetOrderPending: function(req, res) {

        /* If the user is the admin, redirect them to the admin page; the admin is not allowed to place orders */
        if (req.session.isAdmin == true) {
			res.redirect('/');

        /* If the user is unregistered, redirect them to the landing page */
        } else {
			if (req.session.username == undefined) {
				res.redirect('/');

			/* If the user is registered, update the status of the selected order accordingly */
			} else {
				/* Set the status of the order with the corresponding ObjectID to "Pending" */
				let orderId = req.params.id;
				
				let filter = {_id: db.convertToObjectId(orderId)};
				let update = {status: "Pending"};
				
				db.updateOne(Order, filter, update, function(flag) {
					
					/* Retrieve the ObjectID of the user's current order */
					let query = {username: req.session.username};
					let projection = 'username currentOrder';

					db.findOne(Client, query, projection, function(result) {
						let currentOrder = result.currentOrder;

						/* If the user submitted their current order, set their current order to blank
						 * before redirecting them to the pending orders page 
						 */
						if (currentOrder == orderId) {
							let clientFilter = {username: req.session.username};
							let clientUpdate = {currentOrder: ""};

							db.updateOne(Client, clientFilter, clientUpdate, function(flag) {
								/* Redirect the user to the pending orders page */
								res.redirect('/account/myOrders/pending');
							});

						/* Otherwise, immediately redirect them to the pending orders page */
						} else {
							/* Redirect the user to the pending orders page */
							res.redirect('/account/myOrders/pending');
						}
					});	
				});
			}      
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
                /* If the user is the admin, redirect them to the admin view of the delivered orders page */
				if (req.session.isAdmin == true) {
					res.redirect('/account/admin/orders/delivered');

				/* Otherwise, direct them to the user view of the delivered orders page */
				} else {
					res.redirect('/account/myOrders/delivered');
				}
            });

        /* If the user is not registered, redirect them to the landing page */
        } else {
            res.redirect('/');
        }	
	}
}

module.exports = orderTrackerController;