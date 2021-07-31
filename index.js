const dotenv = require('dotenv');
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const routes = require('./routes/routes.js');
const helper = require('./helpers/helpers.js');
const db = require('./models/db.js');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');

const krafts = express();

dotenv.config();
port = process.env.PORT;
hostname = process.env.HOSTNAME;
url = process.env.DB_URL;

db.connect();

krafts.set('view engine','hbs');
krafts.use(express.static(path.join(__dirname, '/public')));
krafts.use(express.urlencoded({extended:true}));
krafts.use(bodyParser.urlencoded({extended:false}));
krafts.engine('hbs',exphbs({
	defaultLayout: 'main',
	extname:'.hbs',
	helpers: helper})
);

krafts.use(session({
	secret: process.env.session_secret,
	resave: false,
	saveUninitialized: false,
	store: new MongoStore({mongooseConnection: mongoose.connection})
}));

krafts.use('/',routes);

krafts.listen(port, hostname, function() {
	console.log('Server is running at: ');
	console.log('http://' + hostname + ':' + port);
});
