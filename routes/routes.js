const express = require('express');

const krafts = express();
const db = require('../models/db.js');

const filesController = require('../controllers/files-controller.js');
const indexController = require('../controllers/index-controller.js');
const displayController = require('../controllers/display-controller.js');
const signUpController = require('../controllers/sign-up-controller.js');
const logInController = require('../controllers/log-in-controller.js');
const validation = require('../helpers/validation.js');

/* For file uploads */
krafts.get('/files/:filename', filesController.getFile);

/* For index page */
krafts.get('/', indexController.getDisplay);

/* <a> || navbar.hbs || line 9 */
krafts.get('/krafts-pool', function(req,res) {
    
});

/* For sign up page */
krafts.get('/signup', signUpController.getSignUp);
krafts.post('/signup', validation.signUpValidation(), signUpController.postSignUp);
krafts.get('/getCheckUsername', signUpController.getCheckUsername);
krafts.get('/getCheckEmail', signUpController.getCheckEmail);


/* For log in page */
krafts.post('/postLogIn', logInController.postLogIn);

/* For file upload - FOR TESTING ONLY : REMOVE ON DEPLOYMENT */
const uploadsTestController = require('../controllers/uploads-test-controller.js');
krafts.get('/uploadsTest', uploadsTestController.displayPage);
krafts.post('/uploadLogo', db.connect().single('upload-test'), displayController.postEditLogo);
/* END -- REMOVE ON DEPLOYMENT */

module.exports = krafts;