import Manager from "./glidejs/Manager"

$(() => {
    const $proposalsSlider = $("#proposals_slider");
    const $proposalsGlideItems = $("#proposals_glide_items");
    const $filterForm = $("#filters-form");
    const $smallFilterForm = $("#filter-box form");
    const slider = new Manager($proposalsSlider, $proposalsGlideItems, $(".glide__bullet.glide__bullet_idx"), $filterForm);
    const smallSlider = new Manager($proposalsSlider, $proposalsGlideItems, $(".glide__bullet.glide__bullet_idx"), $smallFilterForm);
    slider.start()

    $filterForm.on("change", () => {
        slider.start()
    });

    $smallFilterForm.on("change", () => {
        smallSlider.start()
    });
});