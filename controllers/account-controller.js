/* Controller for handling the account page */

/* The db file, display schema, and client schema are used for the account page */
const db = require('../models/db.js');
const Display = require('../models/display-schema.js');
const Client = require('../models/client-schema.js');

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

					res.render('admin-products-manager', details);

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
	}
}

module.exports = accountController;