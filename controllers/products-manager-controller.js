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

const productsManagerController = {
	/**
	 * Deletes the selected product from the database
	 * @param req object that contains information on the HTTP request from the client
	 * @param res object that contains information on the HTTP response from the server 
	 */
	postDeleteItem: function(req, res) {

		/* Obtain the ID of the product to be deleted from the modal */
		let id = req.body.modalDeleteProductId;

		/* Delete the catalog item document with the corresponding ID */
		let conditions = {_id: db.convertToObjectId(id)};

		db.deleteOne(CatalogItem, conditions, function(err, result) {
			/* If the deletion is successful, update the products manager page */
			res.status(200).json(conditions);
			res.send();
		});
	},

	/**
	 * Gets the edit product page
	 * @param req object that contains information on the HTTP request from the client
	 * @param res object that contains information on the HTTP response from the server 
	 */
	getEditItem: function(req, res) {
		/* Prepare a query for the web application logo */
		let query = {id: 0};
		
		/* Retrieve the web application logo from the database */
		db.findOne(Display, query, '', function(result) {
			
			/* If the data retrieval was successful, display the account page */
			if (result) {

				appLogo = result;

				/* If the user is using an administrator account, display the page accordingly */
				if (req.session.isAdmin == true) {

					/* Retrieve the data corresponding to the ID of the selected product */
					let query = {_id: db.convertToObjectId(req.params.id)};
					let projection = '_id name quantity price description ratings numberSold pictures';

					db.findOne(CatalogItem, query, projection, function(result) {
						let item = result;

						/* Compute for the average rating of the product */
						let aveRating = 0;
						let numRatings = item.ratings.length;

						if (numRatings > 0) {
							let totalRating = 0;
							for (let i = 0; i < numRatings; i++) {
								totalRating += items.ratings[i];
							}

							aveRating = totalRating / numRatings;
						}

						let details = {
							style: 'edit-product',
							logo: appLogo.logo,
							userFlag: true,
							adminFlag: true,
							username: req.session.username,

							id: item._id,
							name: item.name,
							quantity: item.quantity,
							price: item.price,
							description: item.description,
							numberSold: item.numberSold,
							aveRating: aveRating,
							numRatings: numRatings,
							pictures: item.pictures
						}

						res.render('edit-product', details);
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
	 * Gets the view product page
	 * @param req object that contains information on the HTTP request from the client
	 * @param res object that contains information on the HTTP response from the server 
	 */
	getViewItem: function(req, res) {
		/* Prepare a query for the web application logo */
		let query = {id: 0};
		
		/* Retrieve the web application logo from the database */
		db.findOne(Display, query, '', function(result) {
			
			/* If the data retrieval was successful, display the account page */
			if (result) {

				appLogo = result;

				/* If the user is using an administrator account, display the nav bar accordingly */
				if (req.session.isAdmin == true) {
					
					/* Retrieve the data corresponding to the ID of the selected product */
					let query = {_id: db.convertToObjectId(req.params.id)};
					let projection = '_id name quantity price description ratings numberSold pictures';

					db.findOne(CatalogItem, query, projection, function(result) {
						let item = result;

						/* Compute for the average rating of the product */
						let aveRating = 0;
						let numRatings = item.ratings.length;

						if (numRatings > 0) {
							let totalRating = 0;
							for (let i = 0; i < numRatings; i++) {
								totalRating += items.ratings[i];
							}

							aveRating = totalRating / numRatings;
						}

						let details = {
							style: 'view-product',
							logo: appLogo.logo,
							userFlag: true,
							adminFlag: true,
							username: req.session.username,

							id: item._id,
							name: item.name,
							quantity: item.quantity,
							price: item.price,
							description: item.description,
							numberSold: item.numberSold,
							aveRating: aveRating,
							numRatings: numRatings,
							pictures: item.pictures
						}

						res.render('view-product', details);
					});

				/* If the user is unregistered, display the nav bar accordingly */
				} else {
					if (req.session.username == undefined) {

						/* Retrieve the data corresponding to the ID of the selected product */
						let query = {_id: db.convertToObjectId(req.params.id)};
						let projection = '_id name quantity price description ratings numberSold pictures';

						db.findOne(CatalogItem, query, projection, function(result) {
							let item = result;

							/* Compute for the average rating of the product */
							let aveRating = 0;
							let numRatings = item.ratings.length;

							if (numRatings > 0) {
								let totalRating = 0;
								for (let i = 0; i < numRatings; i++) {
									totalRating += items.ratings[i];
								}

								aveRating = totalRating / numRatings;
							}

							let details = {
								style: 'view-product',
								logo: appLogo.logo,
								userFlag: false,
								adminFlag: false,
								username: req.session.username,

								id: item._id,
								name: item.name,
								quantity: item.quantity,
								price: item.price,
								description: item.description,
								numberSold: item.numberSold,
								aveRating: aveRating,
								numRatings: numRatings,
								pictures: item.pictures
							}

							res.render('view-product', details);
						});

					/* If the user is not the admin, display the nav bar accordingly */
					} else {

						/* Retrieve the data corresponding to the ID of the selected product */
						let query = {_id: db.convertToObjectId(req.params.id)};
						let projection = '_id name quantity price description ratings numberSold pictures';

						db.findOne(CatalogItem, query, projection, function(result) {
							let item = result;

							/* Compute for the average rating of the product */
							let aveRating = 0;
							let numRatings = item.ratings.length;

							if (numRatings > 0) {
								let totalRating = 0;
								for (let i = 0; i < numRatings; i++) {
									totalRating += items.ratings[i];
								}

								aveRating = totalRating / numRatings;
							}

							let details = {
								style: 'view-product',
								logo: appLogo.logo,
								userFlag: true,
								adminFlag: false,
								username: req.session.username,

								id: item._id,
								name: item.name,
								quantity: item.quantity,
								price: item.price,
								description: item.description,
								numberSold: item.numberSold,
								aveRating: aveRating,
								numRatings: numRatings,
								pictures: item.pictures
							}

							res.render('view-product', details);
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
	 * Adds the selected product to an order
	 * @param req object that contains information on the HTTP request from the client
	 * @param res object that contains information on the HTTP response from the server 
	 */
	 postViewItem: function(req, res) {
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

					/* If the user is registered, display the order page accordingly */
					} else {
						let id = req.body.orderProductId;

						/* Retrieve the data corresponding to the ID of the selected product */
						let query = {_id: db.convertToObjectId(id)};
						let projection = '_id name quantity price pictures';

						db.findOne(CatalogItem, query, projection, function(result) {
							let item = result;

							/* Create a new order item for the chosen product */
							let orderItem = {
								orderItemId: "",
								productId: item._id,
								quantity: 0,
								packaging: "",
								packagingColor: "",
								packagingMessage: "",
								itemColor: "",
								itemText: "",
								includeCompanyLogo: false,
								companyLogoImage: "",
								companyLogoLocation: [],
								additionalInstructions: "",
								price: item.price,
								orderItemPrice: 0
							}

							/* Add the order item and retrieve its ObjectID from the database */
							db.insertOne(OrderItem, orderItem, function(flag) {
								orderItem.orderItemId = flag._id;
								
								/* Retrieve the user data to check whether they have an open order */
								let query = {username: req.session.username};
								let projection = 'username currentOrder';

								db.findOne(Client, query, projection, function(result) {
									let client = result;

									/* If the user does not have an open order, create a new order containing the selected product */
									if (client.currentOrder == "") {
										
										/* Create a new order containing the order item */
										let order = {
											name: "",
											companyName: "",
											orderItemIds: [orderItem.orderItemId],
											deliveryMode: "",
											preferredDeliveryDate: 0,
											paymentType: "",
											price: 0,
											status: "Unsubmitted",
											isCompanyLogoUploaded: "false"
										}

										/* Add the order and retrieve its ObjectID from the database */
										db.insertOne(Order, order, function(flag) {
											let orderId = flag._id;

											let filter = {username: req.session.username};
											let update = {currentOrder: orderId,
														  $push: {orderIds: orderId}};
											
											/* Set the current order as the user's open order */
											db.updateOne(Client, filter, update, function(error, result) {
												
												/* Send the ObjectID of the created order to open it on the Order page */
												res.status(200).json(orderId);
												res.send();
											});
										});
									
									/* If the user has an open order, add the product to their open order */
									} else {
										let filter = {_id: client.currentOrder};
										let update = {$push: {orderItemIds: orderItem.orderItemId}};

										db.updateOne(Order, filter, update, function(error, result) {
											res.status(200).json(client.currentOrder);
											res.send();
										})
									};
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
	 * Toggles the visibility of a product
	 * @param req object that contains information on the HTTP request from the client
	 * @param res object that contains information on the HTTP response from the server 
	 */
	getToggleVisibility: function(req, res) {
		/* Prepare a query for the web application logo */
		let query = {id: 0};
		
		/* Retrieve the web application logo from the database */
		db.findOne(Display, query, '', function(result) {
			
			/* If the data retrieval was successful, display the account page */
			if (result) {

				appLogo = result;

				/* If the user is using an administrator account, display the page accordingly */
				if (req.session.isAdmin == true) {

					/* Retrieve the visibility of the selected product */
					let query = {_id: db.convertToObjectId(req.params.id)};
					let projection = 'visible';

					db.findOne(CatalogItem, query, projection, function(result) {
						let item = result;
						let filter = {_id: db.convertToObjectId(req.params.id)};
						
						/* If the item is originally visible, set its visibility to false, and vice versa */
						let update;
						if (item.visible) {
							update = {visible: false};
						} else {
							update = {visible: true};
						}

						db.updateOne(CatalogItem, filter, update, function(error, result) {

							/* Reload the products manager page after updating the product visibility */
							res.redirect('/account/admin/productsManager');
						});
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
	 * Submits information stored in the edit product page
	 * 
	 * @param req object that contains information on the HTTP request from the client
	 * @param res object that contains information on the HTTP response from the server 
	 */
	postEditItem: function(req, res) {

		/* Use the product ID for the database query */
		let filter = {_id: db.convertToObjectId(req.params.id)};

		/* MAY BE REUSED FOR PICTURES */
		/* Iterate over the five pictures */
		var paths = [];
		
		/* Names in the HTML form are one-based */
		for (let i = 1; i <= maxNumItems; i++) {
			if (req.files['productImg' + i]) {
				paths.push('/files/' + req.files['productImg' + i][0]['filename'])
			}
		}

		/* Filter the image data in the database to be edited/added */
		let modifiedIndicesStr = req.body.modifiedIndices;
		let deletedIndicesStr = req.body.deletedIndices;
		let originalPicsStr = req.body.originalPics;

		/*
		 * Convert the string data from the input fields into arrays:
		 * - The indices are delimited per character.
		 * - The paths to the pictures are delimited using a comma.
		 */
		let modifiedIndices = modifiedIndicesStr.split('');
		let deletedIndices = deletedIndicesStr.split('');
		let editedPics = originalPicsStr.split(',');

		/*
		 * If the user originally uploaded less than the maximum number of pictures, ensure that the number
		 * of elements in the array is equal to the maximum	by placing empty strings.
		 * 
		 * This is to prevent complications related to editing paths to existing images and adding paths 
		 * to newly uploaded images.
		 */
		const numBlankPics = maxNumItems - editedPics.length;
		for (let i = 0; i < numBlankPics; i++) {
			editedPics.push('');
		}

		/*
		 * Address the case that the user chooses to remove originally uploaded photos by setting their
		 * paths to empty strings.
		 */
		for (let i = 0; i < deletedIndices.length; i++) {
			editedPics[deletedIndices[i]] = '';
		}

		/*
		 * It is expected that the length of modifiedIndices is equal to the length of paths since they
		 * both reflect the number of images uploaded by the user.
		 */
		for (let i = 0; i < modifiedIndices.length; i++) {
			editedPics[modifiedIndices[i]] = paths[i];
		}

		editedPics = editedPics.filter(function(element) {
			return element != '';
		});

		/* Remove every instance of placeholder */
		if (editedPics[0] == imagePlaceholder && editedPics.length != 0) {
			editedPics.shift();
		}

		/* Use the placeholder image if all product photos have been removed */
		if (editedPics.length == 0) {
			editedPics.push(imagePlaceholder);
		}

		/* Retrieve the data entered in the text fields */
		let productName = req.body.productName;
		let productDesc = req.body.description;
		let productPrice = req.body.productPrice;
		let productQuantity = req.body.quantity;

		/* Trim the entered data to remove heading and trailing whitespaces */
		let formattedProductName = productName.trim();
		let formattedProductDesc = productDesc.trim();
		let formattedProductPrice = productPrice.trim();
		let formattedProductQuantity = productQuantity.trim();

		/* Assign the needed details to the variable update */
		let update = {
			name: formattedProductName,
			quantity: formattedProductQuantity,
			description: formattedProductDesc,
			price: formattedProductPrice,
			pictures: editedPics
		}

		/* Insert the new product into the database and redirect the user to the landing page */
		db.updateOne(CatalogItem, filter, update, function(error, result) {
			res.status(200).json(update);
			res.send();
			res.redirect('/account/admin/productsManager');
		});
	}
}

module.exports = productsManagerController;