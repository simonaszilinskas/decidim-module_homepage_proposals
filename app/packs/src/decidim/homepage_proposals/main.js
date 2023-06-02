import FormFilterComponents from "src/decidim/form_filter.js";
import Slider from "./slider"
import Glide from "@glidejs/glide";

$(() => {
    const $proposalsSlider = $("#proposals_slider");
    const $proposalsGlideItems = $("#proposals_glide_items");
    const $filterForm = $("#filters-form");
    const slider = new Slider($proposalsSlider, $proposalsGlideItems, $filterForm);
    slider.start().then(r => slider.glide.mount())

    $filterForm.on("change", (event) => {
        slider.start().then(r => slider.glide.mount())
    });
});