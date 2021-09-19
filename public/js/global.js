/* JavaScript file for handling the front end functionalities concerning the tooltips, messages, and ratings */

$(document).ready(function() {
    /* Retrieve the elements that have tooltip functionalities */
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    });


    /* Reformat the relevant elements when the upload file option is selected in the messaging feature */
    $('#write-message-upload-file').click(function(){
        $('#file-upload-row').removeClass('hidden');
        $('#message-uploaded-file').removeClass('hidden');
        $('#write-message-text-area').css("height","197px");
    });


    /* Edit the front end of the rating representations (i.e., the five stars) depending on the rating 
     * the user selects
     */
    $('.rate1, .rate2, .rate3, .rate4, .rate5').each(function(){
        $(this).click(function(){

            var elem = $(this).attr('class');
            var temp = elem.split(" ");
            var rate = temp[1];

            var star1, star2, star3, star4, star5;
            star1 = $('#star1');
            star2 = $('#star2');
            star3 = $('#star3');
            star4 = $('#star4');
            star5 = $('#star5');

            switch(rate){
                case "rate1": 
                    var hasFar = $('#star1').hasClass('far');
                    if(hasFar){
                        star1.addClass('fas').removeClass('far');
                    }
                    else{
                        star1.addClass('far').removeClass('fas');
                        star2.addClass('far').removeClass('fas');
                        star3.addClass('far').removeClass('fas');
                        star4.addClass('far').removeClass('fas');
                        star5.addClass('far').removeClass('fas');
                    }
                    
                break;

                case "rate2": 
                    var hasFar = $('#star2').hasClass('far');
                    if(hasFar){
                        star1.addClass('fas').removeClass('far');
                        star2.addClass('fas').removeClass('far');
                       
                    }
                    else{
                        star3.addClass('far').removeClass('fas');
                        star4.addClass('far').removeClass('fas');
                        star5.addClass('far').removeClass('fas');
                    }
                break;

                case "rate3": 
                    var hasFar = $('#star3').hasClass('far');

                    if(hasFar){
                        star1.addClass('fas').removeClass('far');
                        star2.addClass('fas').removeClass('far');
                        star3.addClass('fas').removeClass('far');
                     
                    }
                    else{
                        star4.addClass('far').removeClass('fas');
                        star5.addClass('far').removeClass('fas');
                    }
                break;

                case "rate4": 
                    var hasFar = $('#star4').hasClass('far');

                    if(hasFar){
                        star1.addClass('fas').removeClass('far');
                        star2.addClass('fas').removeClass('far');
                        star3.addClass('fas').removeClass('far');
                        star4.addClass('fas').removeClass('far');
                      
                    }
                    else{
        
                        star5.addClass('far').removeClass('fas');
                    }
                break;

                case "rate5":
                    var hasFar = $('#star5').hasClass('far');

                    if(hasFar){
                        star1.addClass('fas').removeClass('far');
                        star2.addClass('fas').removeClass('far');
                        star3.addClass('fas').removeClass('far');
                        star4.addClass('fas').removeClass('far');
                        star5.addClass('fas').removeClass('far');
                    }
                   
                break;
                default: alert("ERROR");

            }
         
        });
    });

    /* Alter the rating display depending on the selected rating that the user would like to see comments for */
    $('#show-1star, #show-2star, #show-3star, #show-4star, #show-5star').each(function(){
        $(this).click(function(){

            var btn = $(this).attr('id');
            var show1, show2, show3, show4, show5;
            show1 = $('#show-1star');
            show2 = $('#show-2star');
            show3 = $('#show-3star');
            show4 = $('#show-4star');
            show5 = $('#show-5star');

            switch(btn){
                case "show-1star":
                    show1.addClass('bgc4').removeClass('bgc3');
                    show2.addClass('bgc3').removeClass('bgc4');
                    show3.addClass('bgc3').removeClass('bgc4');
                    show4.addClass('bgc3').removeClass('bgc4');
                    show5.addClass('bgc3').removeClass('bgc4');

                break;

                case "show-2star":
                    show2.addClass('bgc4').removeClass('bgc3');
                    show1.addClass('bgc3').removeClass('bgc4');
                    show3.addClass('bgc3').removeClass('bgc4');
                    show4.addClass('bgc3').removeClass('bgc4');
                    show5.addClass('bgc3').removeClass('bgc4');
                break;

                case "show-3star":                
                    show3.addClass('bgc4').removeClass('bgc3');
                    show1.addClass('bgc3').removeClass('bgc4');
                    show2.addClass('bgc3').removeClass('bgc4');
                    show4.addClass('bgc3').removeClass('bgc4');
                    show5.addClass('bgc3').removeClass('bgc4');
                break;

                case "show-4star":
                    show4.addClass('bgc4').removeClass('bgc3');
                    show1.addClass('bgc3').removeClass('bgc4');
                    show2.addClass('bgc3').removeClass('bgc4');
                    show3.addClass('bgc3').removeClass('bgc4');
                    show5.addClass('bgc3').removeClass('bgc4');
                break;

                case "show-5star":
                    show5.addClass('bgc4').removeClass('bgc3');
                    show1.addClass('bgc3').removeClass('bgc4');
                    show2.addClass('bgc3').removeClass('bgc4');
                    show3.addClass('bgc3').removeClass('bgc4');
                    show4.addClass('bgc3').removeClass('bgc4');
                break;

            }
        });
    })

 
});