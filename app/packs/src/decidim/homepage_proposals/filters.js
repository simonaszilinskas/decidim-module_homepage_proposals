import FormFilterComponents from "src/decidim/form_filter.js"

const filterForm = jQuery('#filters-form')

if (filterForm.length) {
    new FormFilterComponents(filterForm)
}

jQuery(() => {
    const $proposalsSlider = jQuery("#proposals-slider");
    const $loading = $proposalsSlider.find(".loading");
    const filterLinksSelector = ".order-by__tabs a"

    $loading.hide();

    $proposalsSlider.on("change", (event) => {
        const $processesGridCards = $proposalsSlider.find(".carousel");
        let $target = jQuery(event.target);

        if (!$target.is("a")) {
            $target = $target.parents("a");
        }

        $processesGridCards.empty();
        $loading.show();

        if (window.history) {
            window.history.pushState(null, null, $target.attr("href"));
        }

        const $proposalsSliderContent = $('#proposals-at-a-glance');

        $.ajax({
            url: 'proposals_slider/refresh_proposals', // Use the new route
            method: 'GET',
            success: function(response) {
                $proposalsSliderContent.html(response);
                $loading.hide();
            },
            error: function() {
                $loading.hide();
                console.log('Error refreshing proposals slider');
            }
        });
    });

    jQuery(".button--clear-filters").on("click", (event) => {
        event.preventDefault();
        window.history.pushState(null, null, window.location.pathname);
        window.location.reload();
    });
});
