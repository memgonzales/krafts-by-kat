const dotenv = require('dotenv');
const express = require('express');
const exphbs = require('express-handlebars');
const nocache = require("nocache");

const bodyParser = require('body-parser');
const path = require('path');

const mongoose = require('mongoose');
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);

const routes = require('./routes/routes.js');
const helper = require('./helpers/helpers.js');
const db = require('./models/db.js');

const krafts = express();

dotenv.config();
port = process.env.PORT;
hostname = process.env.HOSTNAME || 3000;
url = process.env.DB_URL;

db.connect();

krafts.set('view engine','hbs');
krafts.use(express.static(path.join(__dirname, '/public')));
krafts.use(express.json());
krafts.use(express.urlencoded({extended:true}));
krafts.engine('hbs',exphbs({
	defaultLayout: 'main',
	extname:'.hbs',
	helpers: helper})
);

krafts.use(nocache());

krafts.use(session({
	secret: process.env.session_secret,
	resave: false,
	saveUninitialized: false,
	store: new mongoStore({mongooseConnection: mongoose.connection})
}));

krafts.use('/',routes);

krafts.listen(port, hostname, function() {
	console.log('Server is running at: ');
	console.log('http://' + hostname + ':' + port);
});

/* For unit testing of REST API */
module.exports = krafts;