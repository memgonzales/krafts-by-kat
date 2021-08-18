$(document).ready(function() {
    $('.delete-dropdown').on('click', function() {
        let id = $(this).attr('id');

        /* The last token (as delimited by hyphens) of the element ID is its index number in the HTML file */
        let idTokens = id.split('-');
        let index = idTokens[idTokens.length - 1];

        /* Retrieve the (database) product ID and name of the selected product */
        let productId = $('#product-id-' + index).text();
        let productName = $('#product-name-' + index).text();

        /* Pass the (database) ID of the selected product to the hidden deletion form */
        $('#modal-delete-product-id').val(productId);

        /* Display the product name in the modal */
        $('#deleteProductName').text(productName);

        /* Display the modal */
        $('#delete-product-modal').modal('show');
    });

    /* Delete the selected product upon submitting the form (i.e., pressing the "Delete" button)*/
    $('#modal-delete-form').on('submit', function(e) {
        e.preventDefault();

        $.ajax({
            url: '/deleteItem',
            method: 'POST',
            data: $('#modal-delete-form').serialize(),
            success: function() {
                deleteItem();
            }
        });
    });

    /* Hide the modal if the cancel button is clicked */
    $('#cancel-delete').on('click', function() {
        $('#delete-product-modal').modal('hide');
    });
});

/**
 * Updates the display of the products manager page after deleting a product 
 */
function deleteItem() {
    location.href = '/account/admin/productsManager';
}