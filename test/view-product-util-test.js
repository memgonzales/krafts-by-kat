const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const assert = require('chai').assert;
const {formatNumberIDText, 
    formatNumberID,
    hideAddToOrder,
    getPictures,
    displayPictures,
    emphasizeOnLoad,
    isPlaceholder} = require('./view-product-util');

describe('the function to format numbers', function() {
    it('should return a string', function() {
        const result = formatNumberIDText('#units-sold', '4567');
        assert.typeOf(result, 'string');
    });

    it('should not place any commas on digits with less than or equal to 3 digits', function() {
        const result = formatNumberIDText('#units-sold', '123');
        assert.equal(result, '123');
    });

    it('should place commas to separate groups of three digits', function() {
        const result = formatNumberIDText('#units-available', '1234567');
        assert.equal(result, '1,234,567');
    });

    it('should affix peso sign to product prices (integers)', function() {
        const result = formatNumberIDText('#product-price', '₱1234567');
        assert.equal(result, '₱1,234,567.00');
    });

    it('should affix peso sign to product prices (with decimal digits)', function() {
        const result = formatNumberIDText('#product-price', '₱1234567.84');
        assert.equal(result, '₱1,234,567.84');
    });

    it('should display exactly two decimal digits for product prices (integers)', function() {
        const result = formatNumberIDText('#product-price', '₱1234567');
        assert.equal(result, '₱1,234,567.00');
    });

    it('should display exactly two decimal digits for product prices (with decimal digits)', function() {
        const result = formatNumberIDText('#product-price', '₱1234567.50');
        assert.equal(result, '₱1,234,567.50');
    });

    it('should not display decimal digits for non-product prices', function() {
        const result = formatNumberIDText('#units-available', '123.4');
        assert.equal(result, '123');
    });
});

describe('the function to format a number given the ID of its container', function() {
    beforeEach(function() {
        const dom = new JSDOM(
            '<html><body><div id = "hello">12345</div></body></html>',
            {url: 'http://localhost'});

        global.window = dom.window;
        global.document = dom.window.document;   
        global.$ = global.jQuery = require('jquery')(window);
    });

    it('should change the formatting of the number inside the container with the given ID', function() {
        const result = formatNumberID('#hello');
        assert.equal($('#hello').text(), '12,345');
    });
});

describe('the function to hide the Add to Order button', function() {
    beforeEach(function() {
        const dom = new JSDOM(
            '<html><body><div id = "is-admin">true</div><button id = "add-to-order"></button></body></html>',
            {url: 'http://localhost'});

        global.window = dom.window;
        global.document = dom.window.document;   
        global.$ = global.jQuery = require('jquery')(window);
    });

    it('should hide the Add to Order button if info indicates use of admin account', function() {
        const result = hideAddToOrder();
        assert.equal($('#add-to-order').css('display'), 'none');
    });

    it('should show the Add to Order button if info indicates use of non-admin account', function() {
        $('#is-admin').text('false');
        const result = hideAddToOrder();
        assert.notEqual($('#add-to-order').css('display'), 'none');
    });
});

describe('the function to get the paths of the product photos', function() {
    it('should return an array', function() {
        const result = getPictures('');
        assert.typeOf(result, 'array');
    });

    it('should return a single-element array if the path string does not contain any path', function() {
        const result = getPictures('');
        assert.lengthOf(result, 1);
    });

    it('should return a single-element array if the path string contains only a single path', function() {
        const result = getPictures('img1.png');
        assert.lengthOf(result, 1);
    });

    it('should return a two-element array if the path string contains two paths', function() {
        const result = getPictures('img1.png,img2.png');
        assert.lengthOf(result, 2);
    });

    it('should return a three-element array if the path string contains three paths', function() {
        const result = getPictures('img1.png,img2.png,img3.png');
        assert.lengthOf(result, 3);
    });
});

describe('the function to display the product photos', function() {
    beforeEach(function() {
        const dom = new JSDOM(
            '<html><body><img src = "pic-big"><img id = "pic-big"><i id = "icon-big"></i><div id = "small-view-pic-container"><div id = "img1"><img id = "pic1"><i id = "icon1"></i></div><div id = "img2"><img id = "pic2"><i id = "icon2"></i></div><div id = "img3"><img id = "pic3"><i id = "icon3"></i></div></div></body></html>',
            {url: 'http://localhost'});

        global.window = dom.window;
        global.document = dom.window.document;   
        global.$ = global.jQuery = require('jquery')(window);
    });

    it('should display the first photo as the large picture if it is not a placeholder', function() {
        const pictures = ['img1.png', 'img2.png'];
        const placeholder = '/img/placeholder/no-image.png';

        const result = displayPictures(pictures, placeholder);
        assert.equal($('#pic-big').attr('src'), 'img1.png');
        assert.equal($('#pic-big').css('display'), 'block');
    });

    it('should not display the first photo as the large picture if it is a placeholder', function() {
        const pictures = ['/img/placeholder/no-image.png'];
        const placeholder = '/img/placeholder/no-image.png';

        const result = displayPictures(pictures, placeholder);
        assert.notEqual($('#pic-big').attr('src'), '/img/placeholder/no-image.png');
    });

    it('should display all the product photos in the small pictue gallery', function() {
        const pictures = ['img1.png', 'img2.png'];
        const placeholder = '/img/placeholder/no-image.png';

        const result = displayPictures(pictures, placeholder);
        assert.equal($('#pic1').attr('src'), 'img1.png');
        assert.equal($('#pic2').attr('src'), 'img2.png');
        assert.equal($('#pic1').css('display'), 'inline-block');
        assert.equal($('#pic2').css('display'), 'inline-block');
    });

    it('should hide the large icon placeholder', function() {
        const pictures = ['img1.png', 'img2.png'];
        const placeholder = '/img/placeholder/no-image.png';

        const result = displayPictures(pictures, placeholder);
        assert.equal($('#icon-big').css('display'), 'none');
    });

    it('should hide the small icon placeholders', function() {
        const pictures = ['img1.png', 'img2.png'];
        const placeholder = '/img/placeholder/no-image.png';

        const result = displayPictures(pictures, placeholder);
        assert.equal($('#icon1').css('display'), 'none');
        assert.equal($('#icon2').css('display'), 'none');
    });

    it('should hide the product photo placeholders if the user uploaded less than the maximum', function() {
        const pictures = ['img1.png', 'img2.png'];
        const placeholder = '/img/placeholder/no-image.png';

        const result = displayPictures(pictures, placeholder);
        assert.equal($('#small-view-pic-container').children().length, 2);
    });
});

describe('the function to place a border around the first uploaded product photo', function() {
    beforeEach(function() {
        const dom = new JSDOM(
            '<html><body><img id = "img1"></body></html>',
            {url: 'http://localhost'});

        global.window = dom.window;
        global.document = dom.window.document;   
        global.$ = global.jQuery = require('jquery')(window);
    });

    it('should put a red border if the first photo is not the placeholder', function() {
        const pictures = ['img1.png', 'img2.png'];
        const placeholder = '/img/placeholder/no-image.png';

        const result = emphasizeOnLoad(pictures, placeholder);
        assert.equal($('#img1').css('background-color'), 'rgb(229, 209, 184)');
    });

    it('should not put a red border if the first photo is the placeholder', function() {
        const pictures = ['/img/placeholder/no-image.png'];
        const placeholder = '/img/placeholder/no-image.png';

        const result = emphasizeOnLoad(pictures, placeholder);
        assert.notEqual($('#img1').css('background-color'), 'rgb(229, 209, 184)');
    });
});

describe('the function to check if the first photo is merely a placeholder', function() {
    it('should return a Boolean', function() {
        const result = isPlaceholder(['/img/placeholder/no-image.png', 'img1.png'], '/img/placeholder/no-image.png');
        assert.isBoolean(result);
    });

    it('should return true if the first photo is a placeholder', function() {
        const result = isPlaceholder(['/img/placeholder/no-image.png', 'img1.png'], '/img/placeholder/no-image.png');
        assert.equal(result, true);
    });

    it('should return false if the first photo is not a placeholder', function() {
        const result = isPlaceholder(['img1.png', 'img2.png'], '/img/placeholder/no-image.png');
        assert.equal(result, false);
    });
});

