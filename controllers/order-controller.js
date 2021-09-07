/* Controller for handling the order page */

/* The db file, display schema, client schema, and order schema are used for the order page */
const db = require('../models/db.js');
const Display = require('../models/display-schema.js');
const Client = require('../models/client-schema.js');
const Order = require('../models/order-schema.js');

const orderController = {

	/** 
	 * Displays the order page
	 * 
	 * @param req object that contains information on the HTTP request from the client
	 * @param res object that contains information on the HTTP response from the server 
	 */
	getOrder: function(req, res) {

		/* Prepare a query for the web application logo */
		let query = {id: 0};
		
		/* Retrieve the web application logo from the database */
		db.findOne(Display, query, '', function(result) {
			
			/* If the data retrieval was successful, display the new product page */
			if (result) {

				/* If the user is using an administrator account, redirect them to the landing page;
                 * the administrator cannot place orders
                 */
				if (req.session.isAdmin == true) {
					res.redirect('/');

				/* If the user is unregistered, redirect them to the landing page */
				} else {
                    if (req.session.username == undefined) {
                        res.redirect('/');

                    /* If the user is registered, display the page accordingly */
                    } else {

                        let details = {
                            style: 'order-product',
                            logo: appLogo.logo,
                            userFlag: false,
                            adminFlag: false,
                            username: req.session.username,
                            isAdmin: req.session.isAdmin,
                        }

                        res.render('order-product', details);
                    }
					
				}	

			/* If the data retrieval was not successful, display an error message */			
			} else {
				console.log("Missing graphics elements");
			}
		});
	}
}

module.exports = orderController;