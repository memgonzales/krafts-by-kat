const db = require('../models/db.js');

const mongoose = require('mongoose');
const grid = require('gridfs-stream');

const filesController = {
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