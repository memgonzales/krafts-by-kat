const db = require('../models/db.js');

const bcrypt = require('bcrypt');

const Client = require('../models/client-schema.js');

const logInController = {
    postLogIn: function(req, res) {
        let username = req.body.username;
        let password = req.body.password;
		
		let query = {username: username};

        db.findOne(Client, query, '', function (result) {
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
}

module.exports = logInController;