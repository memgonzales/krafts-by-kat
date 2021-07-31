const db = require('../models/db.js');
const Display = require('../models/display-schema.js');

const displayController = {
	postEditLogo: function(req, res) {
		let filename = "/files/" + req.file.filename;
		
		let filter = {id: 0};
		let update = {logo: filename};
		
		db.updateOne(Display, filter, update, function(err, result) {
			res.status(200).send();
		});
	}
}

module.exports = displayController;