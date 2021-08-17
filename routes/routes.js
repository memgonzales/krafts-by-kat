/* Javascript file routing the redirect strings to their respective controllers */

/* Use the express web application framework*/
const express = require('express');

/* Use the krafts database and the db file for accessing the database */
const krafts = express();
const db = require('../models/db.js');

/* Call the controllers for each of the web application features */
const filesController = require('../controllers/files-controller.js');
const indexController = require('../controllers/index-controller.js');
const displayController = require('../controllers/display-controller.js');
const signUpController = require('../controllers/sign-up-controller.js');
const logInController = require('../controllers/log-in-controller.js');
const logOutController = require('../controllers/log-out-controller.js');
const newProductController = require('../controllers/new-product-controller.js');

/* Call the validation file */
const validation = require('../helpers/validation.js');

/* For file uploads */
krafts.get('/files/:filename', filesController.getFile);

/* For index page */
krafts.get('/', indexController.getDisplay);

/* For sign up page */
krafts.get('/signup', signUpController.getSignUp);
krafts.post('/postSignup', validation.signUpValidation(), signUpController.postSignUp);
krafts.get('/getCheckUsername', signUpController.getCheckUsername);
krafts.get('/getCheckEmail', signUpController.getCheckEmail);

/* For log in page */
krafts.post('/postLogIn', logInController.postLogIn);

/* For user page */
krafts.get('/logOut', logOutController.getLogOut);

/* For new product page */
krafts.get('/newProduct', newProductController.getNewProduct);
const newProductFields = [{name: 'productImg1', maxCount: 1},
                          {name: 'productImg2', maxCount: 1},
                          {name: 'productImg3', maxCount: 1},
                          {name: 'productImg4', maxCount: 1},
                          {name: 'productImg5', maxCount: 1}];
krafts.post('/postNewProduct', db.connect().fields(newProductFields), newProductController.postNewProduct);

/* For file upload - FOR TESTING ONLY : REMOVE ON DEPLOYMENT */
const uploadsTestController = require('../controllers/uploads-test-controller.js');
krafts.get('/uploadsTest', uploadsTestController.displayPage);
krafts.post('/uploadLogo', db.connect().single('upload-test'), displayController.postEditLogo);
/* END -- REMOVE ON DEPLOYMENT */



/* TEMPORARY ROUTING FOR FRONT-END EASE */
krafts.get('/partials-test', function(req,res){
    var obj = {
        style: 'account'
    }
    res.render('partials-test',obj);
});


krafts.get('/view-product', function(req,res){
    var obj = {
        style: 'view-product'
    }
    res.render('view-product',obj);
});

krafts.get('/order', function(req,res){
    var obj = {
        style: 'order-product'
    }
    res.render('order-product', obj);
})



/* START of Account Related Routes */
    // IMPORTANT: For now ginawa ko lang /account ung route for easy access BUT BUT PERO.. Ang intention is /account/{{username}}
    // This means that EVERY nav tab na may <a> to "My Account" is currently JUST /account na dapat /account/{{username}} 
    // I'm putting this here para di ko  makalimutan pero sana makita niyo ito devs. Pero sana di ko rin makalimutan ;-;
    // -- Ralph
krafts.get('/account', function(req,res){
    var obj = {
        style:'account'
    }

    res.render('user-account',obj);
});

krafts.get('/account/purchase-history', function(req,res){
    var obj = {
        style:'account'
    }

    res.render('user-purchase-history',obj);
});

krafts.get('/account/support', function(req,res){
    var obj = {
        style:'account'
    }

    res.render('user-support',obj);
});

krafts.get('/account/admin/orders', function(req,res){
    var obj = {
        style:'account'
    }

    res.render('admin-orders',obj);
});

krafts.get('/account/admin/messages', function(req,res){
    var obj = {
        style:'account'
    }

    res.render('admin-messages',obj);
});

krafts.get('/account/admin/products-manager', function(req,res){
    var obj = {
        style:'account'
    }

    res.render('admin-products-manager',obj);
});

krafts.get('/account/admin/clients-manager', function(req,res){
    var obj = {
        style:'account'
    }

    res.render('admin-clients-manager',obj);
});


/* END of Account Related Routes */



module.exports = krafts;