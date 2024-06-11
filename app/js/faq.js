$(document).ready(function(){
    $('.faq__accordion-top').on('click',function(){
        if($(this).hasClass('faq__accordion--open') == false) {
            $('.faq__accordion-top').removeClass('faq__accordion--open').next().slideUp();
            $(this).addClass('faq__accordion--open').next().slideDown();
        }
        else{
            $(this).removeClass('faq__accordion--open').next().slideUp();
        }
    });
});