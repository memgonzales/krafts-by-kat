const db = require('../models/db.js');

const bcrypt = require('bcrypt');

const Client = require('../models/client-schema.js');
const BusinessOwner = require('../models/business-owner-schema.js');

const logInController = {
    postLogIn: function(req, res) {
        let username = req.body.username.trim();
        let password = req.body.password;
		
		let queryUsername = {username: username};
        let queryEmail = {emailAddress: username};

        let queryAdmin = {username: "kraftsbykatadmin"};

        /* Log in for admin account */
        if (JSON.stringify(username) == JSON.stringify("kraftsbykatadmin") || 
            JSON.stringify(username) == JSON.stringify("krafts.by.kat.webmaster@gmail.com")) {
            db.findOne(BusinessOwner, queryAdmin, '', function (result) {
                if (result) {
                    let businessOwner = {
                        username: result.username,
                        emailAddress: result.emailAddress,
                        contactNumber: result.contactNumber,
                        deliveryAddress: result.deliveryAddress,
                        pictureFileName: result.pictureFileName
                    }

                    bcrypt.compare(password, result.password, function (err, equal) {
                        if (equal) {
                            res.status(200).send();
                        } else {
                            res.status(403).send();
                        }
                    });
                } else {
                    res.status(403).send();
                }
            });

        /* Log in for client accounts */
        } else {
            db.findOne(Client, queryUsername, '', function (result) {
                if (result) {
                    let client = {
                        username: result.username,
                        firstName: result.firstName,
                        middleName: result.middleName,
                        lastName: result.lastName,
                        emailAddress: result.emailAddress,
                        contactNumber: result.contactNumber,
                        deliveryAddress: result.deliveryAddress,
                        pictureFileName: result.pictureFileName
                    }

                    bcrypt.compare(password, result.password, function (err, equal) {
                        if (equal) {
                            res.status(200).send();
                        } else {
                            res.status(403).send();
                        }
                    });
                    
                } else {
                    db.findOne(Client, queryEmail, '', function (result) {
                        if (result) {
                            let client = {
                                username: result.username,
                                firstName: result.firstName,
                                middleName: result.middleName,
                                lastName: result.lastName,
                                emailAddress: result.emailAddress,
                                contactNumber: result.contactNumber,
                                deliveryAddress: result.deliveryAddress,
                                pictureFileName: result.pictureFileName
                            }

                            bcrypt.compare(password, result.password, function (err, equal) {
                                if (equal) {
                                    res.status(200).send();
                                } else {
                                    res.status(403).send();
                                }
                            });
                         } else {
                            res.status(403).send();
                         }  
                    });
                }
            });
        }
    }
}

module.exports = logInController;