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
    }).mount();

    glide.on("run", function(){
        let bulletNumber = glide.index;
        $($(".glide__bullets").children()).css("color", "lightgrey");
        $($(".glide__bullets").children().get(bulletNumber+1)).css("color", "grey");
    });
});
