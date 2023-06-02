import FormFilterComponents from "src/decidim/form_filter.js";
import Slider from "./slider"
import Glide from "@glidejs/glide";

$(() => {
    const $proposalsSlider = $("#proposals_slider");
    const $proposalsGlideItems = $("#proposals_glide_items");
    const $filterForm = $("#filters-form");
    const glide = new Glide('.glide', {
        type: 'carousel',
        startAt: 0,
        perView: 4,
        autoplay: 3500,
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
    })
    glide.on("run", (evt) => {
        let bulletNumber = glide.index;
        $($(".glide__bullets").children()).css("color", "lightgrey");
        $($(".glide__bullets").children().get(bulletNumber + 1)).css("color", "grey");
    });

    const slider = new Slider($proposalsSlider, $proposalsGlideItems, $filterForm, glide);
    slider.start();

    $filterForm.on("change", (event) => {
        slider.start();
    });
});