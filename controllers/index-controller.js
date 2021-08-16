/* Controller for displaying the landing page */

/* The db file, display schema, and catalog item schema are used to display the landing page */
const db = require('../models/db.js');
const Display = require('../models/display-schema.js');
const CatalogItem = require('../models/catalog-item-schema.js');

const indexController = {
	/**
	 * Gets the landing page
	 * 
	 * @param req object that contains information on the HTTP request from the client
	 * @param res object that contains information on the HTTP response from the server 
	 */
	getDisplay: function(req, res) {
		/* Query for retrieving the web application logo */
		let query = {id: 0};
		
		/* Retrieve the web application logo from the database */
		db.findOne(Display, query, '', function(result) {

			/* If the logo retrieval is successful, the landing page is displayed */
			if (result) {
				/* Assign the result of the database retrieval to the variable appLogo */
				let appLogo = result;
				
				/* Assign the needed details of the item catalog documents to the variable projection */
				let projection = 'name quantity description price commentIds pictures ratings numberSold';

				/* The needed details of all catalog items are retrieved to be displayed on the landing page */
				db.findMany(CatalogItem, {}, projection, function(result) {
					/* If the data retrieval is successful, the landing page is displayed */
					if (result != null) {
						/* Store data in parallel arrays (to allow for processing) */
						let names = [];
						let quantities = [];
						let descriptions = [];
						let prices = [];
						let comments = [];
						let pictures = [];
						let ratings = [];
						let aveRatings = [];
						let numberSold = [];

						/* Assign the results of the database retrieval to the variable items */
						let items = result;

						/* For each catalog item, push each detail to its respective array */
						for (let i = 0; i < items.length; i++) {
							names.push(items[i].name);
							quantities.push(items[i].quantity);
							descriptions.push(items[i].description);
							prices.push(items[i].price);
							numberSold.push(items[i].numberSold);
							/* Currently, commentIds are stored as comments (will change to actual comments once comment functionality has been implemented) */
							comments.push(items[i].commentIds);
							pictures.push(items[i].pictures);
							ratings.push(items[i].ratings);

							/* Average rating is displayed as 0 if there are no ratings yet */
							if (items[i].ratings.length == 0) {
								aveRatings.push(0);

							/* Otherwise, the average rating is computed and displayed */
							} else {
								var totalRating = 0;

								for (let j = 0; j < items[i].ratings.length; j++) {
									totalRating += items[i].ratings[j];
								}

								aveRatings.push(totalRating / items[i].ratings.length);
							}
						}

						/* Display the landing page for unregistered users */
						if (req.session.username == undefined) {
							/* The retrieved catalog items are passed for display */
							let details = {
								style: 'index',
								logo: appLogo.logo,
								userFlag: false,
								adminFlag: false,
								productNames: names,
								productQuantities: quantities,
								productDescriptions: descriptions,
								productPrices: prices,
								productComments: comments,
								productPictures: pictures,
								productRatings: aveRatings,
								productNumberSold: numberSold
							}

							res.render('index', details);

						} else {

							/* Display the landing page for the administrator account */
							if (req.session.isAdmin == true) {
								/* The retrieved catalog items are passed for display */
								let details = {
									style: 'index',
									logo: appLogo.logo,
									userFlag: true,
									adminFlag: true,
									productNames: names,
									productQuantities: quantities,
									productDescriptions: descriptions,
									productPrices: prices,
									productComments: comments,
									productPictures: pictures,
									productRatings: aveRatings,
									productNumberSold: numberSold
								}

								res.render('index', details);

							/* Display the landing page for regular user accounts */
							} else {
								/* The retrieved catalog items are passed for display */
								let details = {
									style: 'index',
									logo: appLogo.logo,
									userFlag: true,
									adminFlag: false,
									productNames: names,
									productQuantities: quantities,
									productDescriptions: descriptions,
									productPrices: prices,
									productComments: comments,
									productPictures: pictures,
									productRatings: aveRatings,
									productNumberSold: numberSold
								}

								res.render('index', details);
							}
						}

					/* Display a message on the console if the web application logo cannot be retrieved */
					} else {
						console.log("Missing graphics elements");
					}
				});
			}
		});
	}
}

module.exports = indexController;