const db = require('../models/db.js');
const Client = require('../models/client-schema.js');
const bcrypt = require('bcrypt');

const logInController = {
    postLogIn: function(req, res) {
        var username = req.body.username;
        var password = req.body.password;

        db.findOne(Client, {username: username}, '', function (result) {
            if (result) {
                var client = {
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
                        res.redirect('/');
                    }

                    else {
                        console.log("ERROR");
                    }
                });
            }

            else {
                console.log("ERROR");
            }
        });
    }
}

module.exports = logInController;