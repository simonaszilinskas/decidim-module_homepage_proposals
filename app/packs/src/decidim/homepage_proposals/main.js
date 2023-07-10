import Manager from "./glidejs/Manager"

// Build GlideJS carousel in the content block
// Tree
// ./glideBuilder.js - Build a new instance of GlideJS carousel with options based on current number of proposals found
// ./glidejs/Manager.js - Start, Refresh, Stop GlideJS carousel, creates proposals cards items in carousel
// ./glidejs/glideitems/* - GlideJS items to render
$(() => {
    const $proposalsSlider = $("#proposals_slider");
    const $proposalsGlideItems = $("#proposals_glide_items");
    const $filterForm = $("#filters-form");
    const $smallFilterForm = $("#filter-box form");
    const slider = new Manager($proposalsSlider, $proposalsGlideItems, $(".glide__bullet.glide__bullet_idx"), $filterForm);
    const smallSlider = new Manager($proposalsSlider, $proposalsGlideItems, $(".glide__bullet.glide__bullet_idx"), $smallFilterForm);
    slider.start()

    // Refresh slider when Desktop filter form changes
    $filterForm.on("change", () => {
        slider.start()
    });

    // Refresh slider when Mobile filter form changes
    $smallFilterForm.on("change", () => {
        smallSlider.start()
    });
});