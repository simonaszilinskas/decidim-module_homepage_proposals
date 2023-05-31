import FormFilterComponents from "src/decidim/form_filter.js"
const filterForm = jQuery('#filters-form')

if (filterForm.length) {
    new FormFilterComponents(filterForm)
}

jQuery(() => {
    const $proposalsSlider = jQuery("#proposals_slider");
    const $loading = $proposalsSlider.find(".loading");

    $loading.hide();

    $proposalsSlider.on("change", (event) => {
        const $processesGridCards = $proposalsSlider.find(".glide");
        let $target = jQuery(event.target);

        if (!$target.is("a")) {
            $target = $target.parents("a");
        }

        $processesGridCards.empty();
        $loading.show();

        if (window.history) {
            window.history.pushState(null, null, $target.attr("href"));
        }

        const $proposalsSliderContent = $('#proposals_glide_items');

        $.ajax({
            url: '/proposals_slider/refresh_proposals', // Use the new route
            method: 'GET',
            success: function(response) {
                $proposalsSliderContent.html(response);
                console.log(response)
                $loading.hide();
            },
            error: ((err) => {
                $loading.hide();
                console.log(err)
                console.log('Error refreshing proposals slider');
            })
        });
    });

    jQuery(".button--clear-filters").on("click", (event) => {
        event.preventDefault();
        window.history.pushState(null, null, window.location.pathname);
        window.location.reload();
    });
});
