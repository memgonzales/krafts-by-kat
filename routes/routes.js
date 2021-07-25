const express = require(`express`);

const krafts = express();

krafts.get(`/`,(req,res)=>{
    res.render(`index`,{style:`index`});
});


// //<a> navbar.hbs line 6
// krafts.get(`/krafts-pool`, (req,res)=>{

// });

module.exports = krafts;