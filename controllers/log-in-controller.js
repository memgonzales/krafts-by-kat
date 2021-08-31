/* Controller for logging a user into the web application */

/* The db file, client schema, and business owner schema are used for the login page */
const db = require('../models/db.js');
const Client = require('../models/client-schema.js');
const BusinessOwner = require('../models/business-owner-schema.js');

/* Bcrypt is used to deal with password hashing */
const bcrypt = require('bcrypt');

/* The username and email address of the administrator account are specified as constants */
const adminEmail = "krafts.by.kat.webmaster@gmail.com";
const adminUsername = "kraftsbykatadmin";

const logInController = {

    /**
     * Logs a user into the web application
     * 
     * @param req object that contains information on the HTTP request from the client
     * @param res object that contains information on the HTTP response from the server 
     */
    postLogIn: function(req, res) {

        /* Retrieve the username and password from the user input */
        let username = req.body.username.trim().toLowerCase();
        let password = req.body.password;
		
        /* Use administrator account details for database queries */
		let queryUsername = {username: username};
        let queryEmail = {emailAddress: username};
        let queryAdmin = {username: adminUsername};

        /* Log in for admin account */
        if (JSON.stringify(username) == JSON.stringify(adminUsername) || 
            JSON.stringify(username) == JSON.stringify(adminEmail)) {
            
            /* Retrieve the user's corresponding data from the database */
            db.findOne(BusinessOwner, queryAdmin, '', function (result) {
                
                /* If the database retrieval is successful, the user is logged in */
                if (result) {

                    /* Assign pertinent information to the businessOwner variable */
                    let businessOwner = {
                        username: result.username,
                        emailAddress: result.emailAddress,
                        contactNumber: result.contactNumber,
                        deliveryAddress: result.deliveryAddress,
                        pictureFileName: result.pictureFileName
                    }

                    /* If the entered password matches the password stored in the database, open a session for 
                     * the administrator 
                     */
                    bcrypt.compare(password, result.password, function (err, equal) {
                        if (equal) {
                            req.session.username = businessOwner.username;
                            req.session.isAdmin = true;
                            
                            res.status(200).send();
                        /* If the entered password does not match, display an error message */
                        } else {
                            res.status(403).send();
                        }
                    });

                /* If the database retrieval is not successful, display an error message */
                } else {
                    res.status(403).send();
                }
            });

        /* Log in for client accounts */
        } else {

            /* Retrieve the user's corresponding data from the database using their username */
            db.findOne(Client, queryUsername, '', function (result) {
                
                /* If the database retrieval is successful, the user is logged in */
                if (result) {

                    /* Assign pertinent information to the client variable */
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

                    /* If the entered password matches the password stored in the database, open a session for 
                     * the user
                     */
                    bcrypt.compare(password, result.password, function (err, equal) {
                        if (equal) {
                            req.session.username = client.username;
                            req.session.isAdmin = false;

                            res.status(200).send();
                        
                        /* If the entered password does not match, display an error message */   
                        } else {
                            res.status(403).send();
                        }
                    });
                    
                /* If the database retrieval is not successful, try retrieving data using users' email addresses */
                } else {

                    /* Retrieve the user's corresponding data from the database using their email address */
                    db.findOne(Client, queryEmail, '', function (result) {
                        if (result) {
                            
                            /* Assign pertinent information to the client variable */
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

                            /* If the entered password matches the password stored in the database, 
                             * open a session for the administrator 
                             */
                            bcrypt.compare(password, result.password, function (err, equal) {
                                if (equal) {
                                    req.session.username = client.username;
                                    req.session.isAdmin = false;

                                    res.status(200).send();

                                /* If the entered password does not match, display an error message */
                                } else {
                                    res.status(403).send();
                                }
                            });

                        /* If both keys did not successfully retrieve the user data, display an error message */
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