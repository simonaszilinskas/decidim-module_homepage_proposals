import FormFilterComponents from "src/decidim/form_filter.js";
import { registerCallback, unregisterCallback, pushState, replaceState, state } from "src/decidim/history";

$(() => {
    const filterForm = new FormFilterComponents($('#filters-form'));

    const $proposalsSlider = $("#proposals_slider");
    const $loading = $proposalsSlider.find(".loading");

    $loading.hide();

    $("#filters-form").on("change", (event) => {
        const $processesGridCards = $proposalsSlider.find(".glide");
        let $target = $(event.target);

        if (!$target.is("a")) {
            $target = $target.parents("a");
        }
        // $processesGridCards.empty();
        $loading.show();

        // if (window.history) {
        //     window.history.pushState(null, null, $target.attr("href"));
        // }

        const $proposalsSliderContent = $('#proposals_glide_items');

        // $.ajax({
        //     url: '/proposals_slider/refresh_proposals', // Use the new route
        //     method: 'GET',
        //     success: function(response) {
        //         $proposalsSliderContent.html(response);
        //         console.log(response)
        //         $loading.hide();
        //     },
        //     error: ((err) => {
        //         $loading.hide();
        //         console.log(err)
        //         console.log('Error refreshing proposals slider');
        //     })
        // });

        window.location.replace(filterForm._currentStateAndPath()[0])

    });

    $(".button--clear-filters").on("click", (event) => {
        event.preventDefault();
        window.history.pushState(null, null, window.location.pathname);
        window.location.reload();
    });
});
