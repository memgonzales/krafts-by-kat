const dotenv = require(`dotenv`);
const express = require(`express`);
const exphbs = require(`express-handlebars`);
const bodyParser = require(`body-parser`);
const fs = require(`fs`);
const path = require(`path`);
const helper = require('./helpers/helpers.js')
const routes = require('./routes/routes.js');
const db = require('./models/mongoosedb.js');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const tales = express();

dotenv.config();
port = process.env.PORT;
hostname = process.env.HOSTNAME;
url = process.env.DB_URL;

db.connect();

tales.set(`view engine`,`hbs`);
tales.use(express.static(path.join(__dirname, `/public`)));
tales.use(express.urlencoded({extended:true}));
tales.use(bodyParser.urlencoded({extended:false}));
tales.engine(`hbs`,exphbs({
	defaultLayout: `main`,
	extname:`.hbs`,
	helpers: helper})
);

tales.use(session({
	secret: process.env.session_secret,
	resave: false,
	saveUninitialized: true,
	cookie: {},
	store: MongoStore.create({mongoUrl: url})
}));

tales.use(`/`,routes);

tales.listen(port, hostname, () => {
	console.log(`Server is running at: `);
	console.log(`http://` + hostname + `:` + port);
});
