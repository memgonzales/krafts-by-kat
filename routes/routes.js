const express = require('express');

const krafts = express();

// <div> || navbar.hbs || line 5
krafts.get(`/`,(req,res)=>{

    //[TEMPORARY] will change depending on back-end implementation
    var obj = {
        style:'index',
        user:''
    }
    res.render('index', obj);
});

//<a> || navbar.hbs || line 9
krafts.get('/krafts-pool',(req,res)=>{
    
});

// <a> || navbar.hbs || line 21
krafts.get('/signup', (req,res)=>{
    
    var obj = {
        style: 'signup',
        user: ''
    }
    res.render('sign-up',obj);
});




module.exports = krafts;