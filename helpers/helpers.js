const krafts = require('../routes/routes.js');
const hbs = require('hbs');


const helper = {
    img: (imgSrc) =>{
        
    }
}

hbs.registerHelper('select', function( value, options ){
    var $el = $('<select />').html( options.fn(this) );
    $el.find('[value="' + value + '"]').attr({'selected':'selected'});
    return $el.html();
});

module.exports = helper;