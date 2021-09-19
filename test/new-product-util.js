const hideRemoveImg = function(maxNumPictures) {
    for (let i = 1; i <= maxNumPictures; i++) {
        $('#remove-img' + i).css('visibility', 'hidden');
    }
}

const previewPictures = function(imgTargetResultsOrig, placeholder, maxNumPictures) {
    let imgTargetResults = [];

    /* Push only uploaded images */
    for (var imgTargetResult of imgTargetResultsOrig) {
        if (imgTargetResult != '') {
            imgTargetResults.push(imgTargetResult);
        }
    }

    let imgCtr = imgTargetResults.length;
    let i = 0;

    /* Handle the case when the user uploads only a single product photo then removes it */
    if (imgCtr == 0) {
        $('#polaroid-pic-1').attr('src', placeholder);
        return;
    }

    /* Reset first polaroid picture to active status */
    $('#polaroid-div-1').addClass('active');

    /* Remove the existing polaroid pictures, except the first one */
    for (let j = 2; j <= maxNumPictures; j++) {
        $('#polaroid-div-' + j).remove();
    }

    if (imgCtr >= 1) {
        $('#polaroid-pic-1').attr('src', imgTargetResults[i]);
        i++;

        imgCtr--;

        /* Create a new carousel item for each additional image */
        while (imgCtr != 0) {
            let divImg = document.createElement("div");
            divImg.className = "carousel-item";

            let img = document.createElement("img");
            img.src = imgTargetResults[i];

            divImg.appendChild(img);
            document.getElementById('polaroid-pic-carousel').appendChild(divImg);

            /* Increment immediately since the IDs of the polaroid pictures are one-based */
            i++;
            img.id = "polaroid-pic-" + i;
            img.className = "d-block w-100  thumbnail";
            img.alt = "item " + i;
            divImg.id = "polaroid-div-" + i;

            imgCtr--;
        }
    }
}

const previewText = function() {

    /* Retrieve the entered product name and price from the new product page and apply some formatting */
    let productName = $('#product-name').val();
    let productPrice = $('#product-price').val();
    let formattedProductName = productName.trim();
    let formattedProductPrice = '';
    
    /* Check if the user input a product price */
    if (productPrice) {
        /* Use commas to separate groups of three digits */
        formattedProductPrice = '₱'+ parseFloat(productPrice.trim()).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    }

    /* Display the formatted product name and price on the polaroid */
    $('#item-name').text(formattedProductName);
    $('#item-price').text(formattedProductPrice);
}

const imgFilter = function(extension) {
    switch(extension) {
        /* Fall through in all cases is deliberate */
        case 'jpg':
        case 'jpeg':
        case 'jpe':
        case 'jfif':
        case 'heic':
        case 'png':
        case 'gif':
        case 'webp':
        case 'bmp':
        case 'svg':
            return true;
        default:
            // alert('This file type is not supported. Please upload a valid image.');
            return false;
    }
}

module.exports = {
    hideRemoveImg,
    previewPictures,
    previewText,
    imgFilter
}