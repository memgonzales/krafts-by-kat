const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const assert = require('chai').assert;
const {hideRemoveImg,
    getPictures,
    displayPictures,
    trackModifiedIndices,
    trackDeletedIndices} = require('./edit-product-util');

describe('the function to hide Remove buttons', function() {
    beforeEach(function() {
        const dom = new JSDOM(
            '<html><body><button id = "remove-img1"></button><button id = "remove-img2"></button><button id = "remove-img3"></button><button id = "remove-img4"></button><button id = "remove-img5"></button></body></html>',
            {url: 'http://localhost'});

        global.window = dom.window;
        global.document = dom.window.document;   
        global.$ = global.jQuery = require('jquery')(window);
    });

    it('should hide all the Remove buttons if there are no product photos', function() {
        const pictures = ['/img/placeholder/no-image.png'];
        const placeholder = '/img/placeholder/no-image.png';

        const result = hideRemoveImg(pictures, placeholder, 5);
        for (let i = 1; i <= 5; i++) {
            assert.equal($('#remove-img' + i).css('visibility'), 'hidden');
        }
    });

    it('should not hide all the Remove Buttons for areas with product photos', function() {
        const pictures = ['img1.png', 'img2.png'];
        const placeholder = '/img/placeholder/no-image.png';

        const result = hideRemoveImg(pictures, placeholder, 5);
        for (let i = 1; i <= 2; i++) {
            assert.notEqual($('#remove-img' + i).css('visibility'), 'hidden');
        }
    });

    it('should hide all the Remove Buttons for areas without product photos', function() {
        const pictures = ['img1.png', 'img2.png'];
        const placeholder = '/img/placeholder/no-image.png';

        const result = hideRemoveImg(pictures, placeholder, 5);
        for (let i = 3; i <= 5; i++) {
            assert.equal($('#remove-img' + i).css('visibility'), 'hidden');
        }
    });
});

describe('the function to get the paths to the photos', function() {
    beforeEach(function() {
        const dom = new JSDOM(
            '<html><body><div id = "picturePaths"></div></body></html>',
            {url: 'http://localhost'});

        global.window = dom.window;
        global.document = dom.window.document;   
        global.$ = global.jQuery = require('jquery')(window);
    });

    describe('the function to get the paths of the product photos', function() {
        it('should return an array', function() {
            $('#picturePaths').text('/files/img1.png,/files/img2.png,/files/img3.png');
            const result = getPictures();
            assert.typeOf(result, 'array');
        });
    
        it('should return a single-element array if the path string does not contain any path', function() {
            $('#picturePaths').text('');
            const result = getPictures();
            assert.lengthOf(result, 1);
        });
    
        it('should return a single-element array if the path string contains only a single path', function() {
            $('#picturePaths').text('/files/img1.png');
            const result = getPictures();
            assert.lengthOf(result, 1);
        });
    
        it('should return a two-element array if the path string contains two paths', function() {
            $('#picturePaths').text('/files/img1.png,/files/img2.png');
            const result = getPictures();
            assert.lengthOf(result, 2);
        });
    
        it('should return a three-element array if the path string contains three paths', function() {
            $('#picturePaths').text('/files/img1.png,/files/img2.png,/files/img3.png');
            const result = getPictures();
            assert.lengthOf(result, 3);
        });
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

    it('should not hide the product photo placeholders if the user uploaded less than the maximum', function() {
        const pictures = ['img1.png', 'img2.png'];
        const placeholder = '/img/placeholder/no-image.png';

        const result = displayPictures(pictures, placeholder);
        assert.equal($('#small-view-pic-container').children().length, 3);
    });
});

describe('the function to track the indices of the modified product photos', function() {
    beforeEach(function() {
        const dom = new JSDOM(
            '<html><body><input type = "hidden" id = "modified-indices"></body></html>',
            {url: 'http://localhost'});

        global.window = dom.window;
        global.document = dom.window.document;   
        global.$ = global.jQuery = require('jquery')(window);
    });

    it('should place an empty string if there are no modified product photos', function() {
        const modifiedIndices = [false, false, false, false, false];
        const result = trackModifiedIndices(modifiedIndices, 5);
        assert.equal($('#modified-indices').val(), '');
    });

    it('should place the correct single-character string if there is exactly one modified product photo', function() {
        const modifiedIndices = [false, true, false, false, false];
        const result = trackModifiedIndices(modifiedIndices, 5);
        assert.equal($('#modified-indices').val(), '1');
    });

    it('should place the correct two-character string if there are exactly two modified product photos', function() {
        const modifiedIndices = [false, true, false, false, true];
        const result = trackModifiedIndices(modifiedIndices, 5);
        assert.equal($('#modified-indices').val(), '14');
    });

    it('should place the correct three-character string if there are exactly three modified product photos', function() {
        const modifiedIndices = [false, true, false, true, true];
        const result = trackModifiedIndices(modifiedIndices, 5);
        assert.equal($('#modified-indices').val(), '134');
    });
});

describe('the function to track the indices of the deleted product photos', function() {
    beforeEach(function() {
        const dom = new JSDOM(
            '<html><body><input type = "hidden" id = "deleted-indices"></body></html>',
            {url: 'http://localhost'});

        global.window = dom.window;
        global.document = dom.window.document;   
        global.$ = global.jQuery = require('jquery')(window);
    });

    it('should place an empty string if there are no deleted product photos', function() {
        const deletedIndices = [false, false, false, false, false];
        const result = trackDeletedIndices(deletedIndices, 5);
        assert.equal($('#deleted-indices').val(), '');
    });

    it('should place the correct single-character string if there is exactly one deleted product photo', function() {
        const deletedIndices = [false, true, false, false, false];
        const result = trackDeletedIndices(deletedIndices, 5);
        assert.equal($('#deleted-indices').val(), '1');
    });

    it('should place the correct two-character string if there are exactly two deleted product photos', function() {
        const deletedIndices = [false, true, false, false, true];
        const result = trackDeletedIndices(deletedIndices, 5);
        assert.equal($('#deleted-indices').val(), '14');
    });

    it('should place the correct three-character string if there are exactly three deleted product photos', function() {
        const deletedIndices = [false, true, false, true, true];
        const result = trackDeletedIndices(deletedIndices, 5);
        assert.equal($('#deleted-indices').val(), '134');
    });
});