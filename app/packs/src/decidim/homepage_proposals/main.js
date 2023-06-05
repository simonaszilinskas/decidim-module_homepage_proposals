import Manager from "./glidejs/Manager"

$(() => {
    const $proposalsSlider = $("#proposals_slider");
    const $proposalsGlideItems = $("#proposals_glide_items");
    const $filterForm = $("#filters-form");
    const slider = new Manager($proposalsSlider, $proposalsGlideItems, $(".glide__bullet.glide__bullet_idx"), $filterForm);
    slider.start()

    $filterForm.on("change", () => {
        slider.start()
    });
});