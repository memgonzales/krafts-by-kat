/* Dotenv file used to access constants */
const dotenv = require('dotenv');

/* Mongoose is used for database functions */
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
const urlTest = process.env.DB_URL_TEST;

/* Specify database operations (i.e., connecting to the database, creating the GridFS storage, and the database 
 * CRUD operations)
 */
const database = {
    /** 
     * Connects to the database 
     */
    connect: function() {
        if (process.env.NODE_ENV === 'test') {
            const Mockgoose = require('mockgoose').Mockgoose;
            const mockgoose = new Mockgoose(mongoose);

            mockgoose.prepareStorage()
                .then(function() {
                    mongoose.connect(urlTest, options, function(error) {
                        if (error) throw error;
                        console.log('Connected to: ' + url);
                    });
                    
                    var connection = mongoose.createConnection(urlTest);
                    
                    /* Initialize gfs */
                    var gfs;
                    
                    connection.once('open', function() {
                        /* Initialize stream */
                        gfs = grid(connection.db, mongoose.mongo);
                        gfs.collection('uploads');			
                    })
                    
                    /* Create storage engine */
                    const storage = new gridFsStorage({
                        url: urlTest,
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
        
                    const fileFilter = function(req, file, callback) {
                        /* Exclude the period preceding the file extension, and convert to lowercase */
                        const ext = path.extname(file.originalname).substr(1).toLowerCase();
                        let validExtension = false;
        
                        console.log(ext);
        
                        switch(ext) {
                            /* Fall through in all cases is deliberate */
                            case 'jpg':
                            case 'jpeg':
                            case 'jpe':
                            case 'jfif':
                            case 'heic':
                            case 'png':
                            case 'gif':
                            case 'webp':
                            case 'bmp':
                            case 'svg':
                                validExtension = true;
                                break;
                            default:
                                break;
                        }
        
                        if (!validExtension) {
                            return callback(new Error('This file type is not supported. Please upload a valid image.'))
                        }
        
                        callback(null, true)
                    }
                    
                    const upload = multer({ storage, fileFilter });
                    
                    return upload;
                })

        } else {

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

            const fileFilter = function(req, file, callback) {
                /* Exclude the period preceding the file extension, and convert to lowercase */
                const ext = path.extname(file.originalname).substr(1).toLowerCase();
                let validExtension = false;

                console.log(ext);

                switch(ext) {
                    /* Fall through in all cases is deliberate */
                    case 'jpg':
                    case 'jpeg':
                    case 'jpe':
                    case 'jfif':
                    case 'heic':
                    case 'png':
                    case 'gif':
                    case 'webp':
                    case 'bmp':
                    case 'svg':
                        validExtension = true;
                        break;
                    default:
                        break;
                }

                if (!validExtension) {
                    return callback(new Error('This file type is not supported. Please upload a valid image.'))
                }

                callback(null, true)
            }
            
            const upload = multer({ storage, fileFilter });
            
            return upload;
        }
    },

    /** 
     * Inserts one document into the database 
     * 
     * @param model collection to be accessed 
     * @param doc document to be inserted
     * @param callback callback for indicating whether the insertion succeeded
     * @return whether the insertion succeeded
     */
    insertOne: function(model, doc, callback) {
        model.create (doc, function(error, result) {
            if (error) return callback(false);
            console.log('Added ' + result);
            return callback(result);
        });
    },

    /** 
     * Inserts multiple documents into the database 
     * 
     * @param model collection to be accessed
     * @param docs documents to be inserted
     * @param callback callback for indicating whether the insertion succeeded
     * @return whether the insertion succeeded 
     */
    insertMany: function (model, docs, callback) {
        model.insertMany (docs, function(error, result) {
            if(error) return callback(false);
            console.log('Added ' + result);
            return callback(true);
        });
    },

    /** 
     * Retrieves one document from the database 
     * 
     * @param model collection to be accessed
     * @param query query to be executed on the collection
     * @param projection fields to be returned
     * @param callback callback for indicating whether the search succeeded
     * @return false if the searching did not succeed; otherwise, the specified fields to be returned 
     */
    findOne: function(model, query, projection, callback) {
        model.findOne (query, projection, function(error, result) {
            if (error) return callback(false);
            return callback(result);
        });
    },

    /** 
     * Retrieves multiple documents from the database 
     * 
     * @param model collection to be accessed
     * @param query query to be executed on the collection
     * @param projection fields to be returned
     * @param callback callback for indicating whether the search succeeded
     * @return false if the searching did not succeed; otherwise, the specified fields to be returned 
     */
    findMany: function(model, query, projection, callback) {
        model.find (query, projection, function(error, result) {
            if (error) return callback(false);
            return callback(result);
        });
    },

    /** 
     * Updates one document in the database 
     * 
     * @param model collection to be accessed
     * @param filter query with which to filter the collection documents
     * @param update revisions to the document data
     * @param callback callback for indicating whether the update succeeded
     * @return whether the update succeeded
     */
    updateOne: function(model, filter, update, callback) {
        model.updateOne (filter, update, function(error, result) {
            if (error) return callback(false);
            console.log('Document modified: ' + result.nModified);
            return callback(true);
        });
    },

    /** 
     * Updates multiple documents in the database 
     * 
     * @param model collection to be accessed
     * @param filter query with which to filter the collection documents
     * @param update revisions to the document data
     * @param callback callback for indicating whether the update succeeded
     * @return whether the update succeeded
     */
    updateMany: function(model, filter, update, callback) {
        model.updateMany (filter, update, function(error, result) {
            if (error) return callback(false);
            console.log('Documents modified: ' + result.nModified);
            return callback(true);
        });
    },

    /** 
     * Deletes one document in the database 
     * 
     * @param model collection to be accessed
     * @param conditions query with which to obtain the document to be deleted
     * @param callback callback for indicating whether the deletion succeeded
     * @return whether the deletion succeeded
     */
    deleteOne: function(model, conditions, callback) {
        model.deleteOne (conditions, function (error, result) {
            if(error) return callback(false);
            console.log('Document deleted: ' + result.deletedCount);
            return callback(true);
        });
    },

    /** 
     * Deletes multiple documents in the database 
     * 
     * @param model collection to be accessed
     * @param conditions query with which to obtain the documents to be deleted
     * @param callback callback for indicating whether the deletion succeeded
     * @return whether the deletion succeeded
     */
    deleteMany: function(model, conditions, callback) {
        model.deleteMany (conditions, function (error, result) {
            if(error) return callback(false);
            console.log('Document deleted: ' + result.deletedCount);
            return callback(true);
        });
    },

    /**
     * Converts a string to the ObjectId data type
     * 
     * @param id string to be converted
     * @return ObjectId variable of the input string
     */
    convertToObjectId: function(id) {
        return mongoose.Types.ObjectId(id);
    },

    updateOneIterative: function(model, filter, update) {
        model.updateOne (filter, update, function(error, result) {
            if (error) {
                console.log('Error');
            } else {
                console.log('Document modified: ' + result.nModified);
                console.log(result);
            }
        });
    },
}

module.exports = database;