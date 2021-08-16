/* Controller for performing CRUD operations on the image files used in the web application */

/* The db file is used to manipulate the image files on the database */
const db = require('../models/db.js');

/* Mongoose is used for database functions */
const mongoose = require('mongoose');

/* GridFS is used for storing the image files */
const grid = require('gridfs-stream');

const filesController = {
	/* Retrieve an image file from the database */
	getFile: function(req, res) {
		let connection = mongoose.connection;
		let gfs = grid(connection.db, mongoose.mongo);
		gfs.collection('uploads');
		
		gfs.files.findOne({filename: req.params.filename}, function(err, file) {
			if (!file || file.length == 0) {
				res.redirect('/error');
			} else {
				const readstream = gfs.createReadStream(file.filename);
				readstream.pipe(res);
			}
		});
	}
}

module.exports = filesController;