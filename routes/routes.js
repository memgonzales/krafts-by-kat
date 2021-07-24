const express = require(`express`);

const krafts = express();

krafts.get(`/`,(req,res)=>{
    res.render(`index`,{style:`index`});
});


module.exports = krafts;