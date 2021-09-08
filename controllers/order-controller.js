/* Controller for handling the order page */

/* The db file, display schema, client schema, and order schema are used for the order page */
const db = require('../models/db.js');
const Display = require('../models/display-schema.js');
const Order = require('../models/order-schema.js');
const OrderItem = require('../models/order-item-schema.js');
const CatalogItem = require('../models/catalog-item-schema.js');

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
				let appLogo = result;

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

						/* Retrieve the data of the order to be displayed */
						let query = {_id: db.convertToObjectId(req.params.id)};
						let projection = '_id name companyName orderItemIds deliveryMode preferredDeliveryDate paymentType price status';

						db.findOne(Order, query, projection, function(result) {
							let order = result;

							/* Retrieve the data of each of the order items */
							let orderItemQuery = {_id: {$in: order.orderItemIds}};
							let orderItemProjection = '_id productId quantity packaging packagingColor packagingMessage itemColor itemText includeCompanyLogo companyLogoImage additionalInstructions orderItemPrice';

							db.findMany(OrderItem, orderItemQuery, orderItemProjection, function(result) {
								let orderItemDetails = result;

								/* Store the retrieved data in parallel arrays */
								let orderItemIds = [];
								let productIds = [];
								let quantities = [];
								let packagingOptions = [];
								let packagingColors = [];
								let packagingMessages = [];
								let itemColors = [];
								let itemTexts = [];
								let includeCompanyLogoOptions = [];
								let companyLogoImages = [];
								let additionalInstructionsPassages = [];
								let orderItemPrices = [];

								/* Store the data related to the products of each of the order items in parallel arrays */
								let productNames = [];
								let productQuantities = [];
								let productPrices = [];

								/* Store the data from the database query in the initialized arrays */
								for (let i = 0; i < orderItemDetails.length; i++) {
									orderItemIds[i] = orderItemDetails[i]._id;
									productIds[i] = orderItemDetails[i].productId;
									quantities[i] = orderItemDetails[i].quantity;
								    packagingOptions[i] = orderItemDetails[i].packaging;
									packagingColors[i] = orderItemDetails[i].packagingColor;
									packagingMessages[i] = orderItemDetails[i].packagingMessage;
									itemColors[i] = orderItemDetails[i].itemColor;
									itemTexts[i] = orderItemDetails[i].itemText;
									includeCompanyLogoOptions[i] = orderItemDetails[i].includeCompanyLogo;
									companyLogoImages[i] = orderItemDetails[i].companyLogoImage;
									additionalInstructionsPassages[i] = orderItemDetails[i].additionalInstructions;
									orderItemPrices[i] = orderItemDetails[i].orderItemPrice;
								}

								let productQuery = {_id: {$in: productIds}};
								let productProjection = '_id name quantity price';

								db.findMany(CatalogItem, productQuery, productProjection, function(result) {
									let productData = result;

									/* For each order item, match its product ID with the ObjectIDs of the retrieved
									 * catalog items. If the IDs match, store the pertinent data of the product in 
									 * the initialized arrays. 
									 * 
									 * This approach was used as the findMany() function only returns single instances
									 * of matching documents; thus, the number of retrieved documents may be less than
									 * the number of order items.
									 */
									for (let i = 0; i < orderItemDetails.length; i++) {
										for (let j = 0; j < productData.length; j++) {
											if (productIds[i] == productData[j]._id) {
												productNames[i] = productData[j].name;
												productQuantities[i] = productData[j].quantity;
												productPrices[i] = productData[j].price;
											}
										}
									}

									/* Store the needed data in the details variable and display the page accordingly */
									let details = {
										style: 'order-product',
										logo: appLogo.logo,
										userFlag: true,
										adminFlag: false,
										username: req.session.username,
		
										orderId: order._id,
										orderName: order.name,
										companyName: order.companyName,

										orderItemIds: orderItemIds,
										quantities: quantities, 
										packagingOptions: packagingOptions,
										packagingColors: packagingColors,
										packagingMessages: packagingMessages,
										itemColors: itemColors,
										itemTexts: itemTexts,
										includeCompanyLogoOptions: includeCompanyLogoOptions,
										companyLogoImages: companyLogoImages,
										additionalInstructionsPassages: additionalInstructionsPassages,
										orderItemPrices: orderItemPrices,

										deliverMode: order.deliveryMode,
										productNames: productNames,
										productQuantities: productQuantities,
										productPrices: productPrices,

										preferredDeliveryDate: order.preferredDeliveryDate,
										paymentType: order.paymentType,
										price: order.price
									}
		
									res.render('order-product', details);
								});								
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
	 * Saves the user's order details
	 * @param req object that contains information on the HTTP request from the client
	 * @param res object that contains information on the HTTP response from the server 
	 */
	 postSaveOrder: function(req, res) {
		/* Prepare a query for the web application logo */
		let query = {id: 0};
		
		/* Retrieve the web application logo from the database */
		db.findOne(Display, query, '', function(result) {
			
			/* If the data retrieval was successful, display the account page */
			if (result) {

				appLogo = result;

				/* If the user is using an administrator account, redirect to the landing page;
				 * the administrator cannot make orders
				 */
				if (req.session.isAdmin == true) {
					
					res.redirect('/');

				/* If the user is unregistered, redirect to the landing page */
				} else {
					if (req.session.username == undefined) {

						res.redirect('/');

					/* If the user is registered, save the order accordingly */
					} else {
						let removedOrderItemIds = req.body.removedOrderItemIds;
						let orderId = req.body.orderId;
						let orderName = req.body.orderName;
						let companyName = req.body.companyName;
						let deliveryType = req.body.deliveryType;
						let preferredDeliveryDate = req.body.preferredDeliveryDate;
						let paymentType = req.body.paymentType;

						console.log(removedOrderItemIds);
						console.log(orderId);
						console.log(orderName);
						console.log(companyName);
						console.log(deliveryType);
						console.log(preferredDeliveryDate);
						console.log(paymentType);


						// /* Retrieve the data corresponding to the ID of the selected product */
						// let query = {_id: db.convertToObjectId(id)};
						// let projection = '_id name quantity price pictures';

						// db.findOne(CatalogItem, query, projection, function(result) {
						// 	let item = result;

						// 	/* Create a new order item for the chosen product */
						// 	let orderItem = {
						// 		orderItemId: "",
						// 		productId: item._id,
						// 		quantity: 0,
						// 		packaging: "",
						// 		packagingColor: "",
						// 		packagingMessage: "",
						// 		itemColor: "",
						// 		itemText: "",
						// 		includeCompanyLogo: false,
						// 		companyLogoImage: "",
						// 		companyLogoLocation: [],
						// 		additionalInstructions: "",
						// 		price: item.price,
						// 		orderItemPrice: 0
						// 	}

						// 	/* Add the order item and retrieve its ObjectID from the database */
						// 	db.insertOne(OrderItem, orderItem, function(flag) {
						// 		orderItem.orderItemId = flag._id;
								
						// 		/* Retrieve the user data to check whether they have an open order */
						// 		let query = {username: req.session.username};
						// 		let projection = 'username currentOrder';

						// 		db.findOne(Client, query, projection, function(result) {
						// 			let client = result;

						// 			/* If the user does not have an open order, create a new order containing the selected product */
						// 			if (client.currentOrder == "") {
										
						// 				/* Create a new order containing the order item */
						// 				let order = {
						// 					name: "",
						// 					companyName: "",
						// 					orderItemIds: [orderItem.orderItemId],
						// 					deliveryMode: "",
						// 					preferredDeliveryDate: 0,
						// 					paymentType: "",
						// 					price: 0,
						// 					status: "Unsubmitted"
						// 				}

						// 				/* Add the order and retrieve its ObjectID from the database */
						// 				db.insertOne(Order, order, function(flag) {
						// 					let orderId = flag._id;

						// 					let filter = {username: req.session.username};
						// 					let update = {currentOrder: orderId,
						// 								  $push: {orderIds: orderId}};
											
						// 					/* Set the current order as the user's open order */
						// 					db.updateOne(Client, filter, update, function(error, result) {
												
						// 						/* Send the ObjectID of the created order to open it on the Order page */
						// 						res.status(200).json(orderId);
						// 						res.send();
						// 					});
						// 				});
									
						// 			/* If the user has an open order, add the product to their open order */
						// 			} else {
						// 				let filter = {_id: client.currentOrder};
						// 				let update = {$push: {orderItemIds: orderItem.orderItemId}};

						// 				db.updateOne(Order, filter, update, function(error, result) {
						// 					res.status(200).json(client.currentOrder);
						// 					res.send();
						// 				})
						// 			};
						// 		});
						// 	});
						// });
					}
				}	

			/* If the data retrieval was not successful, display an error message */			
			} else {
				console.log("Missing graphics elements");
			}
		});
	},
}

module.exports = orderController;