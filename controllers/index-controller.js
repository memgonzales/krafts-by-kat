const db = require('../models/db.js');

const Display = require('../models/display-schema.js');
const CatalogItem = require('../models/catalog-item-schema.js');

const indexController = {
	getDisplay: function(req, res) {
		let query = {id: 0};
		
		db.findOne(Display, query, '', function(result) {
			if (result) {
				if (req.session.username == undefined) {
					let details = {
						style: 'index',
						logo: result.logo,
						userFlag: false,
						adminFlag: false
					}

					res.render('index', details);
				} else {
					if (req.session.isAdmin == true) {
						var projection = 'name quantity description price commentIds pictures ratings numberSold';

						db.findMany(CatalogItem, {}, projection, function(result) {
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

								let items = result;

								var i;
								var j;

								for (i = 0; i < items.length; i++) {
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
									} else {
										var totalRating = 0;

										for (j = 0; j < items[i].ratings.length; j++) {
											totalRating += items[i].ratings[j];
										}

										aveRatings.push(totalRating / items[i].ratings.length);
									}
								}

								let details = {
									style: 'index',
									logo: result.logo,
									userFlag: true,
									adminFlag: true,
									username: req.session.username,
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
						});
					} else {
						var projection = 'name quantity description price commentIds pictures ratings numberSold';

						db.findMany(CatalogItem, {}, projection, function(result) {
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

								let items = result;

								var i;
								var j;

								for (i = 0; i < items.length; i++) {
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
									} else {
										var totalRating = 0;

										for (j = 0; j < items[i].ratings.length; j++) {
											totalRating += items[i].ratings[j];
										}

										aveRatings.push(totalRating / items[i].ratings.length);
									}
								}

								let details = {
									style: 'index',
									logo: result.logo,
									userFlag: true,
									adminFlag: false,
									username: req.session.username,
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
						});
					}
				}

			} else {
				console.log("Missing graphics elements");
			}
		});
	}
}

module.exports = indexController;