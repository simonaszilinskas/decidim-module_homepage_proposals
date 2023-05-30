import Glide from '@glidejs/glide'

$(document).ready(function(){
    var glide = new Glide('.glide', {
        type: 'carousel',
        startAt: 0,
        perView: 4,
        autoplay: 1500,
        hoverpause: true,
        breakpoints: {
            1024: {
                perView: 3
            },
            768: {
                perView: 2
            },
            480: {
                perView: 1
            }
        },
        perTouch: 1
    });

    var nextButton = document.querySelector('#next');
    var prevButton = document.querySelector('#prev');

    nextButton.addEventListener('click', function (event) {
        event.preventDefault();

        glide.go('>');
    })

    prevButton.addEventListener('click', function (event) {
        event.preventDefault();

        glide.go('<');
    })

    glide.mount();

});
