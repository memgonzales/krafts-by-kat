$(document).ready(function() {

    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    });


    // Temp Jquery, para makita lang kung pano dapat siya
    $('#write-message-upload-file').click(function(){
        $('#file-upload-row').removeClass('hidden');
        $('#message-uploaded-file').removeClass('hidden');
        $('#write-message-text-area').css("height","197px");
    });
});