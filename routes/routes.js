const express = require(`express`);

const krafts = express();

// <div> || navbar.hbs || line 11 - 19
krafts.get(`/`,(req,res)=>{

    //[TEMPORARY] will change depending on back-end implementation
    var obj = {
        style:'index',
        user:''
    }
    res.render("index", obj);
});

//<a> || navbar.hbs || line 7
krafts.get(`/krafts-pool`,(req,res)=>{
    
});




module.exports = krafts;