import FormFilterComponents from "src/decidim/form_filter.js";
import Slider from "./slider"

$(() => {
    const filterForm = new FormFilterComponents($('#filters-form'));
    const slider = new Slider("#proposals_slider", $('#proposals_glide_items'), filterForm);
    console.log(slider)

    slider.start();
});