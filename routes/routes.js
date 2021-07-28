const express = require('express');

const krafts = express();

/* All objects tagged with [TEMPORARY] may be removed on developer's choice */

// <div> || navbar.hbs || line 5
krafts.get(`/`,(req,res)=>{

    //[TEMPORARY]
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
    
    //[TEMPORARY]
    var obj = {
        style: 'sign-up',
        user: ''
    }
    res.render('sign-up',obj);
});




module.exports = krafts;