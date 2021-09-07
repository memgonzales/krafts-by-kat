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

 
});