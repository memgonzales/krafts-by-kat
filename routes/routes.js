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
const accountController = require('../controllers/account-controller.js');
const productsManagerController = require('../controllers/products-manager-controller.js');
const orderController = require('../controllers/order-controller.js');

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

/* For account page */
krafts.get('/account', accountController.getAccount);
krafts.get('/account/purchaseHistory', accountController.getAccountPurchaseHistory);
krafts.get('/account/myOrders', accountController.getAccountOrders);
krafts.get('/account/admin/orders', accountController.getAccountAdminOrders);
krafts.get('/account/admin/messages', accountController.getAccountAdminMessages);
krafts.get('/account/admin/productsManager', accountController.getAccountAdminProductsManager);
krafts.get('/account/admin/clientsManager', accountController.getAccountAdminClientsManager);

/* For deleting product */
krafts.post('/deleteItem', productsManagerController.postDeleteItem);

/* For editing product */
krafts.get('/editItem/:id', productsManagerController.getEditItem);
const editProductFields = [{name: 'productImg1', maxCount: 1},
                           {name: 'productImg2', maxCount: 1},
                           {name: 'productImg3', maxCount: 1},
                           {name: 'productImg4', maxCount: 1},
                           {name: 'productImg5', maxCount: 1}];
krafts.post('/postEditItem/:id', db.connect().fields(editProductFields), productsManagerController.postEditItem);

/* For viewing product */
krafts.get('/viewItem/:id', productsManagerController.getViewItem);

/* For toggling visibility of product */
krafts.get('/toggleVisibility/:id', productsManagerController.getToggleVisibility);

/* For placing orders */
krafts.get('/getOrder', orderController.getOrder);

/* For file upload - FOR TESTING ONLY : REMOVE ON DEPLOYMENT */
const uploadsTestController = require('../controllers/uploads-test-controller.js');
krafts.get('/uploadsTest', uploadsTestController.displayPage);
krafts.post('/uploadLogo', db.connect().single('upload-test'), displayController.postEditLogo);
/* END -- REMOVE ON DEPLOYMENT */

// FOR CLEANING

/* TEMPORARY ROUTING FOR FRONT-END EASE */
krafts.get('/partials-test', function(req,res){
    var obj = {
        style: 'order-product'
    }
    res.render('partials-test',obj);
});

/* TEMP Orders Nav Tabs*/ 


//ADMIN ORDER NAVIGATION
krafts.get('/account/admin/orders/pending', function(req,res){
    var obj = {style: 'account', isAdmin: true}
    res.render('orders-pending',obj);
});

krafts.get('/account/admin/orders/accepted', function(req,res){
    var obj = {style: 'account', isAdmin: true}
    res.render('orders-accepted',obj);
});

krafts.get('/account/admin/orders/enRoute', function(req,res){
    var obj = {style: 'account', isAdmin: true}
    res.render('orders-en-route',obj);

});

krafts.get('/account/admin/orders/delivered', function(req,res){
    var obj = {style: 'account', isAdmin: true}
    res.render('orders-delivered',obj);

});



// USER ORDER NAVIGATION
krafts.get('/account/myOrders/pending', function(req,res){
    var obj = {style: 'account', isAdmin: false}
    res.render('orders-pending',obj);
});

krafts.get('/account/myOrders/accepted', function(req,res){
    var obj = {style: 'account', isAdmin: false}
    res.render('orders-accepted',obj);
});

krafts.get('/account/myOrders/enRoute', function(req,res){
    var obj = {style: 'account', isAdmin: false}
    res.render('orders-en-route',obj);

});

krafts.get('/account/myOrders/delivered', function(req,res){
    var obj = {style: 'account', isAdmin: false}
    res.render('orders-delivered',obj);

});


krafts.get('/view/orderID', function(req,res){
    var obj = {style: 'account', isAdmin: false}
    res.render('orders-item-focused',obj);
});

krafts.get('/account/contactMerchant', function(req,res){
    var obj = {
        style: 'account'
    }
    res.render('user-contact-merchant',obj);
});

krafts.get('/rate/orderID', function(req,res){
    var obj = {
        style: 'account'
    }
    res.render('rate-order', obj);
})

/*END of TEMP Orders Nav Tabs*/ 



module.exports = krafts;