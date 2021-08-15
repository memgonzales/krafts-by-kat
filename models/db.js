/* Dotenv file used to access constants */
const dotenv = require('dotenv');

/* Mongoose used for database functions */
const mongoose = require('mongoose');

/* Additional middleware for storing and displaying images */
const path = require('path');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const multer = require('multer');
const gridFsStorage = require('multer-gridfs-storage');
const grid = require('gridfs-stream');

/* Modify options to remove deprecation warnings */
const options = {
	useNewUrlParser: true,
    useUnifiedTopology: true
};

/* Configure dotenv with the needed data */
dotenv.config();
const url = process.env.DB_URL;

/* Specify database operations (i.e., connecting to the database, creating the GridFS storage, and the database 
 * CRUD operations)
 */
const database = {
    /* Connect to the database */
    connect: function() {
        mongoose.connect(url, options, function(error) {
            if (error) throw error;
            console.log('Connected to: ' + url);
        });
		
		var connection = mongoose.createConnection(url);
		
		/* Initialize gfs */
		var gfs;
		
		connection.once('open', function() {
			/* Initialize stream */
			gfs = grid(connection.db, mongoose.mongo);
			gfs.collection('uploads');			
		})
		
		/* Create storage engine */
		const storage = new gridFsStorage({
			url: url,
			file: (req, file) => {
				return new Promise((resolve, reject) => {
					crypto.randomBytes(16, (err, buf) => {
						if (err) {
							return reject(err);
						}
						const filename = buf.toString('hex') + path.extname(file.originalname);
						const fileInfo = {
							filename: filename,
							bucketName: 'uploads'
						};
						resolve(fileInfo);
					});
				});
			}
		});
		
		const upload = multer({ storage });
		
		return upload;
    },

    /* Insert one document into the database */
    insertOne: function(model, doc, callback) {
        model.create (doc, function(error, result) {
            if (error) return callback(false);
            console.log('Added ' + result);
            return callback(true);
        });
    },

    /* Insert multiple documents into the database */
    insertMany: function (model, docs, callback) {
        model.insertMany (docs, function(error, result) {
            if(error) return callback(false);
            console.log('Added ' + result);
            return callback(true);
        });
    },

    /* Retrieve one document from the database */
    findOne: function(model, query, projection, callback) {
        model.findOne (query, projection, function(error, result) {
            if (error) return callback(false);
            return callback(result);
        });
    },

    /* Retrieve multiple documents from the database */
    findMany: function(model, query, projection, callback) {
        model.find (query, projection, function(error, result) {
            if (error) return callback(false);
            return callback(result);
        });
    },

    /* Update one document in the database */
    updateOne: function(model, filter, update, callback) {
        model.updateOne (filter, update, function(error, result) {
            if (error) return callback(false);
            console.log('Document modified: ' + result.nModified);
            return callback(true);
        });
    },

    /* Update multiple documents in the database */
    updateMany: function(model, filter, update, callback) {
        model.updateMany (filter, update, function(error, result) {
            if (error) return callback(false);
            console.log('Documents modified: ' + result.nModified);
            return callback(true);
        });
    },

    /* Delete one document in the database */
    deleteOne: function(model, conditions, callback) {
        model.deleteOne (conditions, function (error, result) {
            if(error) return callback(false);
            console.log('Document deleted: ' + result.deletedCount);
            return callback(true);
        });
    },

    /* Delete multiple documents in the database */
    deleteMany: function(model, conditions, callback) {
        model.deleteMany (conditions, function (error, result) {
            if(error) return callback(false);
            console.log('Document deleted: ' + result.deletedCount);
            return callback(true);
        });
    }
}

module.exports = database;