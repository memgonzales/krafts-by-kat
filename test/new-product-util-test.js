const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const assert = require('chai').assert;
const {hideRemoveImg,
    previewPictures,
    previewText,
    imgFilter} = require('./new-product-util');

describe('the function to hide Remove buttons', function() {
    beforeEach(function() {
        const dom = new JSDOM(
            '<html><body><button id = "remove-img1"></button><button id = "remove-img2"></button><button id = "remove-img3"></button><button id = "remove-img4"></button><button id = "remove-img5"></button></body></html>',
            {url: 'http://localhost'});

        global.window = dom.window;
        global.document = dom.window.document;   
        global.$ = global.jQuery = require('jquery')(window);
    });

    it('should hide all the Remove buttons when the page is loaded', function() {
        const result = hideRemoveImg(5);
        for (let i = 1; i <= 5; i++) {
            assert.equal($('#remove-img' + i).css('visibility'), 'hidden');
        }
    });
});

describe('the function to preview product photos', function() {
    beforeEach(function() {
        const dom = new JSDOM(
            '<html><body><div id = "polaroid-pic-carousel"><div id = "polaroid-div-1"><img id = "polaroid-pic-1"></div></div></body></html>',
            {url: 'http://localhost'});

        global.window = dom.window;
        global.document = dom.window.document;   
        global.$ = global.jQuery = require('jquery')(window);
    });

    it('should display the placeholder if no product photos are uploaded', function() {
        const imgTargetResultsOrig = [];
        const placeholder = '/img/placeholder/no-image.png';

        const result = previewPictures(imgTargetResultsOrig, placeholder, 5);
        assert.equal($('#polaroid-pic-1').attr('src'), placeholder);
    });

    it('should mark the first uploaded photo as active to trigger carousel animation', function() {
        const imgTargetResultsOrig = ['img1.png'];
        const placeholder = '/img/placeholder/no-image.png';

        const result = previewPictures(imgTargetResultsOrig, placeholder, 5);
        assert.equal($('#polaroid-div-1').attr('class'), 'active');
    });

    it('should display one photo in the carousel (placeholder) if no product photo was uploaded', function() {
        const imgTargetResultsOrig = [];
        const placeholder = '/img/placeholder/no-image.png';

        const result = previewPictures(imgTargetResultsOrig, placeholder, 5);
        assert.equal($('#polaroid-pic-carousel').children().length, 1);
    });


    it('should display one photo in the carousel if only one product photo was uploaded', function() {
        const imgTargetResultsOrig = ['img1.png'];
        const placeholder = '/img/placeholder/no-image.png';

        const result = previewPictures(imgTargetResultsOrig, placeholder, 5);
        assert.equal($('#polaroid-pic-carousel').children().length, 1);
    });

    it('should display two photos in the carousel if exactly two product photos were uploaded', function() {
        const imgTargetResultsOrig = ['img1.png', 'img2.png'];
        const placeholder = '/img/placeholder/no-image.png';

        const result = previewPictures(imgTargetResultsOrig, placeholder, 5);
        assert.equal($('#polaroid-pic-carousel').children().length, 2);
    });

    it('should display three photos in the carousel if exactly three product photos were uploaded', function() {
        const imgTargetResultsOrig = ['img1.png', 'img2.png', 'img3.png'];
        const placeholder = '/img/placeholder/no-image.png';

        const result = previewPictures(imgTargetResultsOrig, placeholder, 5);
        assert.equal($('#polaroid-pic-carousel').children().length, 3);
    });

    it('should display the carousel photos in the order in which the product photos were uploaded', function() {
        const imgTargetResultsOrig = ['img1.png', 'img2.png', 'img3.png'];
        const placeholder = '/img/placeholder/no-image.png';

        const result = previewPictures(imgTargetResultsOrig, placeholder, 5);
        for (let i = 1; i <= 3; i++) {
            assert.equal($('#polaroid-pic-' + i).attr('src'), 'img' + i + '.png');
        }
    });

    it('should set the class of the carousel photos to match the thumbnail styling', function() {
        const imgTargetResultsOrig = ['img1.png', 'img2.png', 'img3.png'];
        const placeholder = '/img/placeholder/no-image.png';

        const result = previewPictures(imgTargetResultsOrig, placeholder, 5);
        for (let i = 2; i <= 3; i++) {
            assert.equal($('#polaroid-pic-' + i).attr('class'), 'd-block w-100  thumbnail');
        }
    });
});

describe('the function to include product information in the preview', function() {
    beforeEach(function() {
        const dom = new JSDOM(
            '<html><body><input type = "number" id = "product-price"><input type = "text" id = "product-name"><div id = "item-name"></div><div id = "item-price"></div></body></html>',
            {url: 'http://localhost'});

        global.window = dom.window;
        global.document = dom.window.document;   
        global.$ = global.jQuery = require('jquery')(window);
    });

    it('should display the product name correctly', function() {
        $('#product-name').val('hello');
        const result = previewText();
        assert.equal($('#item-name').text(), 'hello');
    });

    it('should display the product name with the starting and ending whitespaces trimmed', function() {
        $('#product-name').val('hello    ');
        const result = previewText();
        assert.equal($('#item-name').text(), 'hello');
    });

    it('should append the peso sign to the product price', function() {
        $('#product-price').val('1234');
        const result = previewText();
        assert.equal(($('#item-price').text())[0], '₱');
    });

    it('should not place any commas on digits with less than or equal to 3 digits', function() {
        $('#product-price').val('123');
        const result = previewText();
        assert.equal($('#item-price').text(), '₱123.00');
    });

    it('should place commas to separate groups of three digits', function() {
        $('#product-price').val('1234567');
        const result = previewText();
        assert.equal($('#item-price').text(), '₱1,234,567.00');
    });

    it('should display the product price with exactly two decimal places (integer)', function() {
        $('#product-price').val('4567');
        const result = previewText();
        assert.equal($('#item-price').text(), '₱4,567.00');
    });

    it('should display the product price with exactly two decimal places (with decimal digits)', function() {
        $('#product-price').val('4567.5');
        const result = previewText();
        assert.equal($('#item-price').text(), '₱4,567.50');
    });
});

describe('the function to reject file uploads that cannot be displayed as images via HTML', function() {
    it('should accept jpg', function() {
        const result = imgFilter('jpg');
        assert.isTrue(result);
    });

    it('should accept jpeg', function() {
        const result = imgFilter('jpeg');
        assert.isTrue(result);
    });

    it('should accept jpe', function() {
        const result = imgFilter('jpe');
        assert.isTrue(result);
    });

    it('should accept jfif', function() {
        const result = imgFilter('jfif');
        assert.isTrue(result);
    });

    it('should accept heic', function() {
        const result = imgFilter('heic');
        assert.isTrue(result);
    });

    it('should accept png', function() {
        const result = imgFilter('png');
        assert.isTrue(result);
    });

    it('should accept gif', function() {
        const result = imgFilter('gif');
        assert.isTrue(result);
    });

    it('should accept webp', function() {
        const result = imgFilter('webp');
        assert.isTrue(result);
    });

    it('should accept bmp', function() {
        const result = imgFilter('bmp');
        assert.isTrue(result);
    });
    
    it('should accept svg', function() {
        const result = imgFilter('svg');
        assert.isTrue(result);
    });
    it('should not accept image formats that cannot be displayed via HTML', function() {
        const result = imgFilter('psd');
        assert.isFalse(result);
    });

    it('should not accept non-image formats', function() {
        const result = imgFilter('docx');
        assert.isFalse(result);
    });
})