/* Controller for performing CRUD operations on the web application logo */

/* The db file and display schema are used to manipulate the logo on the database */
const db = require('../models/db.js');
const Display = require('../models/display-schema.js');

const displayController = {
	/** 
	 * Updates the web application logo
	 * 
	 * @param req object that contains information on the HTTP request from the client
	 * @param res object that contains information on the HTTP response from the server  
	 */
	postEditLogo: function(req, res) {
		/* The new logo is accessed using its file name */
		let filename = "/files/" + req.file.filename;
		
		/* The ID of the original logo is used to retrieve it */
		let filter = {id: 0};

		/* The file name of the new logo will be used to replace the original logo */
		let update = {logo: filename};
		
		/* The web application logo is updated */
		db.updateOne(Display, filter, update, function(err, result) {
			res.status(200).send();
		});
	}
}

module.exports = displayController;