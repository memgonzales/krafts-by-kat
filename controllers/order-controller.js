/* Controller for handling the order page */

/* The db file, display schema, client schema, and order schema are used for the order page */
const db = require('../models/db.js');
const Display = require('../models/display-schema.js');
const Order = require('../models/order-schema.js');
const OrderItem = require('../models/order-item-schema.js');
const CatalogItem = require('../models/catalog-item-schema.js');
const Client = require('../models/client-schema.js');

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
						let projection = '_id name companyName companyLogo isCompanyLogoUploaded orderItemIds deliveryMode preferredDeliveryDate paymentType price status';

						db.findOne(Order, query, projection, function(result) {
							let order = result;

							/* Retrieve the data of each of the order items */
							let orderItemQuery = {_id: {$in: order.orderItemIds}};
							let orderItemProjection = '_id productId quantity packaging packagingColor packagingMessage itemColor itemText includeCompanyLogo companyLogoLocation additionalInstructions orderItemPrice';

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
								let companyLogoLocations = [];
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
									companyLogoLocations[i] = orderItemDetails[i].companyLogoLocation;
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

										companyLogo: order.companyLogo,
										isCompanyLogoUploaded: order.isCompanyLogoUploaded,

										orderItemIds: orderItemIds,
										productIds: productIds,
										quantities: quantities, 
										packagingOptions: packagingOptions,
										packagingColors: packagingColors,
										packagingMessages: packagingMessages,
										itemColors: itemColors,
										itemTexts: itemTexts,
										includeCompanyLogoOptions: includeCompanyLogoOptions,
										companyLogoLocations: companyLogoLocations,
										additionalInstructionsPassages: additionalInstructionsPassages,
										orderItemPrices: orderItemPrices,

										deliveryMode: order.deliveryMode,
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

				/* Store the order data from the order page */
				let removedOrderItemIds = req.body.removedOrderItemIds;
				let orderId = req.body.orderId;
				let orderName = req.body.orderName;
				let companyName = req.body.companyName;
				let deliveryMode = req.body.deliveryModeFinal;
				let preferredDeliveryDate = req.body.preferredDeliveryDate;
				let paymentType = req.body.paymentType;
				let orderPrice = req.body.orderTotalPrice;
				let isCompanyLogoUploaded = req.body.isCompanyLogoUploaded;
				let origCompanyLogo = req.body.origCompanyLogo;

				/* Store the order item data from the order page */
				let orderItemIds = req.body.orderItemId;
				let orderItemQuantities = req.body.orderItemQuantity;
				let orderItemPackagingTypes = req.body.orderItemPackagingType;
				let orderItemPackagingColors = req.body.orderItemPackagingColor;
				let orderItemPackagingMessages = req.body.orderItemPackagingMessage;
				let orderItemColors = req.body.orderItemColor;
				let orderItemTexts = req.body.orderItemText;
				let orderItemCompanyLogos = req.body.orderItemCompanyLogo;
				let orderItemLogoLocations = req.body.logoLocation;
				let orderItemAdditionalInstructions = req.body.orderItemAdditionalInstructions;
				let orderItemPrices = req.body.orderItemFinalPrice;

				if (!(orderItemIds instanceof Array)) {
					orderItemIds = [orderItemIds];
					orderItemQuantities = [orderItemQuantities];
					orderItemPackagingTypes = [orderItemPackagingTypes];
					orderItemPackagingColors = [orderItemPackagingColors];
					orderItemPackagingMessages = [orderItemPackagingMessages];
					orderItemColors = [orderItemColors];
					orderItemTexts = [orderItemTexts];
					orderItemCompanyLogos = [orderItemCompanyLogos];
					orderItemLogoLocations = [orderItemLogoLocations];
					orderItemAdditionalInstructions = [orderItemAdditionalInstructions];
					orderItemPrices = [orderItemPrices];
				}

				/* Assign the data from the above arrays into an array of order item details */
				let orderItemDetails = [];

				if (orderItemIds != undefined) {
					for (let i = 0; i < orderItemIds.length; i++) {
						var locations;
						if (orderItemLogoLocations[i] == undefined) {
							locations = orderItemLogoLocations[i];
						} else {
							locations = orderItemLogoLocations[i].split('|');
						}

						orderItemDetails[i] = {
							quantity: orderItemQuantities[i],
							packaging: orderItemPackagingTypes[i],
							packagingColor: orderItemPackagingColors[i],
							packagingMessage: orderItemPackagingMessages[i],
							itemColor: orderItemColors[i],
							itemText: orderItemTexts[i],
							includeCompanyLogo: orderItemCompanyLogos[i],
							companyLogoLocation: locations,
							additionalInstructions: orderItemAdditionalInstructions[i],
							orderItemPrice: orderItemPrices[i]
						}
					}
				}

				let companyLogo = "";
				if (req.file != null) {
					companyLogo = "/files/" + req.file.filename;
					isCompanyLogoUploaded = "true";
				} else {
					if (isCompanyLogoUploaded == "true") {
						companyLogo = origCompanyLogo;
					}
				}

				/* Split the list of ObjectIDs of the removed order items and store them in an array*/
				let removedOrderItemArray = removedOrderItemIds.split(",");
				removedOrderItemArray.shift();

				let removedOrderItemObjects = [];

				/* Convert the array of IDs from strings to ObjectIDs to enable database comparisons */
				for (let i = 0; i < removedOrderItemArray.length; i++) {
					removedOrderItemObjects[i] = db.convertToObjectId(removedOrderItemArray[i]);
				}

				/* Delete the removed order items from the database */
				let conditions = {_id: {$in: removedOrderItemObjects}};

				db.deleteMany(OrderItem, conditions, function(flag) {
					
					/* Retrieve the user's order from the database */
					let query = {_id: orderId};
					let projection = '_id orderItemIds name companyName deliveryMode preferredDeliveryDate paymentType price';

					db.findOne(Order, query, projection, function(result) {
						let order = result;
						
						/* Create an array to store the updated order item IDs (i.e., having removed
							* the ObjectIDs of order items the user removed from the order)
							*/
						let updatedOrderItemIds = [];

						/* Create another array to store the updated order item details */
						let updatedOrderItemDetails = [];

						/* If the ObjectID of an order item is in the list of removed order item IDs,
							* exclude it from the list of updated order item IDs; similarly, exclude its
							* details from the list of updated order item details
							*/
						let j = 0;
						for (let i = 0; i < order.orderItemIds.length; i++) {
							if (removedOrderItemArray.includes(order.orderItemIds[i]) == false) {
								updatedOrderItemIds[j] = order.orderItemIds[i];
								updatedOrderItemDetails[j] = orderItemDetails[i];
								j++;
							}
						}

						/* Update the order based on the details entered by the user */
						let filter = {_id: orderId};
						let update = {
							name: orderName,
							companyName:companyName,
							orderItemIds:updatedOrderItemIds,
							deliveryMode:deliveryMode,
							preferredDeliveryDate:preferredDeliveryDate,
							paymentType:paymentType,
							price: orderPrice,

							companyLogo: companyLogo,
							isCompanyLogoUploaded: isCompanyLogoUploaded
						}
						
						db.updateOne(Order, filter, update, function(flag) {
							
							/* Update the order items based on the details entered by the user */
							for (let i = 0; i < updatedOrderItemIds.length; i++) {
								orderItemFilter = {_id: updatedOrderItemIds[i]};
								orderItemUpdate = updatedOrderItemDetails[i];

								db.updateOneIterative(OrderItem, orderItemFilter, orderItemUpdate);
							}

							res.status(200).json(update);
							res.send();
						});
					});
				});
			}
		}	
	},

	/**
	 * Submits the user's order
	 * @param req object that contains information on the HTTP request from the client
	 * @param res object that contains information on the HTTP response from the server 
	 */
	 postPlaceOrder: function(req, res) {
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

				/* Store the order data from the order page */
				let removedOrderItemIds = req.body.removedOrderItemIds;
				let orderId = req.body.orderId;
				let orderName = req.body.orderName;
				let companyName = req.body.companyName;
				let deliveryMode = req.body.deliveryModeFinal;
				let preferredDeliveryDate = req.body.preferredDeliveryDate;
				let paymentType = req.body.paymentType;
				let orderPrice = req.body.orderTotalPrice;
				let isCompanyLogoUploaded = req.body.isCompanyLogoUploaded;
				let origCompanyLogo = req.body.origCompanyLogo;

				/* Store the order item data from the order page */
				let orderItemIds = req.body.orderItemId;
				let orderItemQuantities = req.body.orderItemQuantity;
				let orderItemPackagingTypes = req.body.orderItemPackagingType;
				let orderItemPackagingColors = req.body.orderItemPackagingColor;
				let orderItemPackagingMessages = req.body.orderItemPackagingMessage;
				let orderItemColors = req.body.orderItemColor;
				let orderItemTexts = req.body.orderItemText;
				let orderItemCompanyLogos = req.body.orderItemCompanyLogo;
				let orderItemLogoLocations = req.body.logoLocation;
				let orderItemAdditionalInstructions = req.body.orderItemAdditionalInstructions;
				let orderItemPrices = req.body.orderItemFinalPrice;

				if (!(orderItemIds instanceof Array)) {
					orderItemIds = [orderItemIds];
					orderItemQuantities = [orderItemQuantities];
					orderItemPackagingTypes = [orderItemPackagingTypes];
					orderItemPackagingColors = [orderItemPackagingColors];
					orderItemPackagingMessages = [orderItemPackagingMessages];
					orderItemColors = [orderItemColors];
					orderItemTexts = [orderItemTexts];
					orderItemCompanyLogos = [orderItemCompanyLogos];
					orderItemLogoLocations = [orderItemLogoLocations];
					orderItemAdditionalInstructions = [orderItemAdditionalInstructions];
					orderItemPrices = [orderItemPrices];
				}

				/* Assign the data from the above arrays into an array of order item details */
				let orderItemDetails = [];

				if (orderItemIds != undefined) {
					for (let i = 0; i < orderItemIds.length; i++) {
						orderItemDetails[i] = {
							quantity: orderItemQuantities[i],
							packaging: orderItemPackagingTypes[i],
							packagingColor: orderItemPackagingColors[i],
							packagingMessage: orderItemPackagingMessages[i],
							itemColor: orderItemColors[i],
							itemText: orderItemTexts[i],
							includeCompanyLogo: orderItemCompanyLogos[i],
							companyLogoLocation: orderItemLogoLocations[i].split("|"),
							additionalInstructions: orderItemAdditionalInstructions[i],
							orderItemPrice: orderItemPrices[i]
						}
					}
				}

				let companyLogo = "";
				if (req.file != null) {
					companyLogo = "/files/" + req.file.filename;
					isCompanyLogoUploaded = "true";
				} else {
					if (isCompanyLogoUploaded == "true") {
						companyLogo = origCompanyLogo;
					}
				}

				/* Split the list of ObjectIDs of the removed order items and store them in an array*/
				let removedOrderItemArray = removedOrderItemIds.split(",");
				removedOrderItemArray.shift();

				let removedOrderItemObjects = [];

				/* Convert the array of IDs from strings to ObjectIDs to enable database comparisons */
				for (let i = 0; i < removedOrderItemArray.length; i++) {
					removedOrderItemObjects[i] = db.convertToObjectId(removedOrderItemArray[i]);
				}

				/* Delete the removed order items from the database */
				let conditions = {_id: {$in: removedOrderItemObjects}};

				db.deleteMany(OrderItem, conditions, function(flag) {
					
					/* Retrieve the user's order from the database */
					let query = {_id: orderId};
					let projection = '_id orderItemIds name companyName deliveryMode preferredDeliveryDate paymentType price';

					db.findOne(Order, query, projection, function(result) {
						let order = result;
						
						/* Create an array to store the updated order item IDs (i.e., having removed
							* the ObjectIDs of order items the user removed from the order)
							*/
						let updatedOrderItemIds = [];

						/* Create another array to store the updated order item details */
						let updatedOrderItemDetails = [];

						/* If the ObjectID of an order item is in the list of removed order item IDs,
							* exclude it from the list of updated order item IDs; similarly, exclude its
							* details from the list of updated order item details
							*/
						let j = 0;
						for (let i = 0; i < order.orderItemIds.length; i++) {
							if (removedOrderItemArray.includes(order.orderItemIds[i]) == false) {
								updatedOrderItemIds[j] = order.orderItemIds[i];
								updatedOrderItemDetails[j] = orderItemDetails[i];
								j++;
							}
						}

						/* Update the order based on the details entered by the user */
						let filter = {_id: orderId};
						let update = {
							name: orderName,
							companyName:companyName,
							orderItemIds:updatedOrderItemIds,
							deliveryMode:deliveryMode,
							preferredDeliveryDate:preferredDeliveryDate,
							paymentType:paymentType,
							price: orderPrice,

							companyLogo: companyLogo,
							isCompanyLogoUploaded: isCompanyLogoUploaded,

							/* Change the order's status to "Pending" to reflect the user's submission of the order */
							status: "Pending"
						}
						
						db.updateOne(Order, filter, update, function(flag) {
							
							for (let i = 0; i < updatedOrderItemIds.length; i++) {
								
								/* Update the order items based on the details entered by the user */
								orderItemFilter = {_id: updatedOrderItemIds[i]};
								orderItemUpdate = updatedOrderItemDetails[i];

								db.updateOneIterative(OrderItem, orderItemFilter, orderItemUpdate);
							}

							let query = {username: req.session.username};
							let projection = 'username currentOrder';

							db.findOne(Client, query, projection, function(result) {

								let update = {};

								if (result.currentOrder == orderId) {
									update = {currentOrder: ""};
								} 

								db.updateOne(Client, query, update, function(flag) {
									res.status(200).json(update);
									res.send();
								});
							});	
						});
					});
				});
			}
		}	
	},

	/**
	 * Deletes the order of a user from the database
	 * 
	 * @param req object that contains information on the HTTP request from the client
	 * @param res object that contains information on the HTTP response from the server 
	 */
	 getDeleteOrder: function(req, res) {

        /* If the user is the admin, redirect them to the admin page; the admin is not allowed to delete orders */
        if (req.session.isAdmin == true) {
			res.redirect('/');

        /* If the user is unregistered, redirect them to the landing page */
        } else {
			if (req.session.username == undefined) {
				res.redirect('/');

			/* If the user is registered, delete the selected order accordingly */
			} else {
				let orderId = req.params.id;

				/* Delete the order with the specified ObjectID from the database */
				let conditions = {_id: db.convertToObjectId(orderId)};
				
				db.deleteOne(Order, conditions, function(flag) {
					
					/* Retrieve the user's current order */
					let query = {username: req.session.username};
					let projection = 'username currentOrder';

					db.findOne(Client, query, projection, function(result) {
						let currentOrder = result.currentOrder;

						/* Delete the specified ObjectID from the user's list of order IDs*/
						let filter = {username: req.session.username};
						let update = {};

						/* If the order to be deleted is the user's current order, reset their current order */
						if (orderId == currentOrder) {
							update = {
								$pull: {orderIds: orderId},
								currentOrder: ""
							};

						/* Otherwise, simply delete the specified ObjectID from the user's list of order IDs*/
						} else {
							update = {$pull: {orderIds: orderId}};
						}

						db.updateOne(Client, filter, update, function(flag) {
							
							/* Redirect the user to their list of orders */
							res.redirect('/account/myOrders');
						});
					});
				});
			}       
        }	
	}
}

module.exports = orderController;