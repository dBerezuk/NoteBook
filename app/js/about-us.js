$(document).ready(function(){
    $('.about-top__featured-slider').slick({
        slidesToShow: 5,
        slidesToScroll: 5,
        arrows: false,
        autoplay: true,
        dots: true,
        responsive: [
            {
                breakpoint: 1081,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                }
            },
            {
                breakpoint: 887,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 629,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            }
        ]
    });
});