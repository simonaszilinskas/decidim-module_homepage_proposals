$(document).ready(function(){
    // Initialize the Slick Carousel
    $('.carousel').slick({
        slidesToShow: 4, // Number of slides to show at a time
        slidesToScroll: 1, // Number of slides to scroll
        autoplay: true, // Autoplay the carousel
        autoplaySpeed: 1500, // Autoplay speed in milliseconds
        dots: true,
        responsive: [
            {
                breakpoint: 1024, // Medium screens and above
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 768, // Small screens
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 480, // Extra small screens
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });

    $('.carousel .slick-next, .carousel .slick-prev').click(function() {
        $('.carousel').slick('slickPlay'); // Restart autoplay
    });
});