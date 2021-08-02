/* For file upload - FOR TESTING ONLY : REMOVE ON DEPLOYMENT */

const db = require('../models/db.js');

const uploadsTestController = {
	displayPage: function(req, res) {
		res.render('uploads-test');
	}
}

module.exports = uploadsTestController;