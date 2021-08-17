$(document).ready(function() {
    $('.delete-dropdown').on('click', function() {
        let id = $(this).attr('id');

        /* The last token (as delimited by hyphens) of the element ID is its index number in the HTML file */
        let idTokens = id.split('-');
        let index = idTokens[idTokens.length - 1];

        /* Retrieve the (database) product ID of the selected product */
        let productId = $('#product-id-' + index).text();

        /* Pass the (database) ID of the selected product to the hidden deletion form */
        $('#modal-delete-product-id').val(productId);

        /* Display the modal */
        $('#delete-product-modal').modal('show');
        /* === FOR DEBUGGING PURPOSES ONLY! DELETE ONCE PURPOSE IS SERVED === */
        alert( $('#modal-delete-product-id').val());

    });

    $('#cancel-delete').on('click', function() {
        $('#delete-product-modal').modal('hide');
    });
});