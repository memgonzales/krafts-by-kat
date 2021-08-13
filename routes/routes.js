const express = require('express');

const krafts = express();
const db = require('../models/db.js');

const filesController = require('../controllers/files-controller.js');
const indexController = require('../controllers/index-controller.js');
const displayController = require('../controllers/display-controller.js');
const signUpController = require('../controllers/sign-up-controller.js');
const logInController = require('../controllers/log-in-controller.js');
const logOutController = require('../controllers/log-out-controller.js');
const newProductController = require('../controllers/new-product-controller.js');
const validation = require('../helpers/validation.js');

/* For file uploads */
krafts.get('/files/:filename', filesController.getFile);

/* For index page */
krafts.get('/', indexController.getDisplay);

/* For sign up page */
krafts.get('/signup', signUpController.getSignUp);
krafts.post('/signup', validation.signUpValidation(), signUpController.postSignUp);
krafts.get('/getCheckUsername', signUpController.getCheckUsername);
krafts.get('/getCheckEmail', signUpController.getCheckEmail);


/* For log in page */
krafts.post('/postLogIn', logInController.postLogIn);

krafts.get('/logOut', logOutController.getLogOut);

krafts.get('/newProduct', newProductController.getNewProduct);

/* For file upload - FOR TESTING ONLY : REMOVE ON DEPLOYMENT */
const uploadsTestController = require('../controllers/uploads-test-controller.js');
krafts.get('/uploadsTest', uploadsTestController.displayPage);
krafts.post('/uploadLogo', db.connect().single('upload-test'), displayController.postEditLogo);
/* END -- REMOVE ON DEPLOYMENT */



/* TEMPORARY ROUTING FOR FRONT-END EASE */
krafts.get('/partials-test', function(req,res){
    var obj = {
        style: 'index'

    }

    res.render('partials-test',obj);
})

module.exports = krafts;