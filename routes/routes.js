const express = require('express');

const krafts = express();
const db = require('../models/db.js');

const filesController = require('../controllers/files-controller.js');
const indexController = require('../controllers/index-controller.js');
const displayController = require('../controllers/display-controller.js');
const signUpController = require('../controllers/sign-up-controller.js');
const logInController = require('../controllers/log-in-controller.js');

krafts.get('/files/:filename', filesController.getFile);

/* All objects tagged with [TEMPORARY] may be removed on developer's choice */

// <div> || navbar.hbs || line 5
krafts.get('/', indexController.getDisplay);

//<a> || navbar.hbs || line 9
krafts.get('/krafts-pool', function(req,res) {
    
});

// <a> || navbar.hbs || line 21
/* for sign up page */
krafts.get('/signup', signUpController.getSignUp);
krafts.post('/signup', signUpController.postSignUp);

/* for log in page */
krafts.post('/', logInController.postLogIn);

/* For file upload - FOR TESTING ONLY : REMOVE ON DEPLOYMENT */
const uploadsTestController = require('../controllers/uploads-test-controller.js');
krafts.get('/uploadsTest', uploadsTestController.displayPage);
krafts.post('/uploadLogo', db.connect().single('upload-test'), displayController.postEditLogo);
/* END -- REMOVE ON DEPLOYMENY */

module.exports = krafts;