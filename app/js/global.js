$(document).ready(function(){
    let body = $('body');
    let mobileMenuContent = $(".mobile-menu__content");
    let mobileMenu = $('.mobile-menu');

    let windowSearch = $('.window-search');
    let BtnSearch = $('.tools-list__link-search').find('.tools-list__link-img');

    $('.header__mobile-btn').on('click',function(){
        if(windowSearch.css('display') !== 'none'){
            windowSearch.fadeOut();
            BtnSearch.attr('src',BtnSearch.attr('data-src-open'));
        }
        mobileMenu.fadeIn();
        mobileMenuContent.addClass('mobile-menu__content--open');
        body.addClass('off-scroll');
    });
    $(document).mouseup( function(e){
        if(mobileMenu.css('display') !== 'none') {
            if (!mobileMenuContent.is(e.target) && mobileMenuContent.has(e.target).length === 0) {
                mobileMenuContent.removeClass('mobile-menu__content--open');
                setTimeout(function () {
                    mobileMenu.fadeOut();
                },300);
                body.removeClass('off-scroll');
            }
        }
    });
    $(window).resize(function(){
        if($(this).width() >= 886){
            mobileMenuContent.removeClass('mobile-menu__content--open');
            setTimeout(function () {
                mobileMenu.fadeOut();
            },300);
        }
    });
    $('.mobile-menu__navigate-link--click').on('click',function(){
        $(this).find('.mobile-menu__navigate-button').toggleClass('mobile-menu__navigate-button--active');
        $(this).next().slideToggle();
    });
    $('.tools-list__link-search,.mobile-menu__navigate-link--search').on('click',function(){
        if(mobileMenu.css('display') !== 'none'){
            mobileMenuContent.removeClass('mobile-menu__content--open');
            setTimeout(function () {
                mobileMenu.fadeOut();
            },300);
        }
        if(windowSearch.css('display') == 'none'){
            body.addClass('off-scroll');
            windowSearch.fadeIn();
            BtnSearch.attr('src',BtnSearch.attr('data-src-closet'));
        }
        else{
            body.removeClass('off-scroll');
            windowSearch.fadeOut();
            BtnSearch.attr('src',BtnSearch.attr('data-src-open'));
        }
    });
});