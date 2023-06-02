import FormFilterComponents from "src/decidim/form_filter.js";
import { registerCallback, unregisterCallback, pushState, replaceState, state } from "src/decidim/history";

$(() => {
    const filterForm = new FormFilterComponents($('#filters-form'));

    const $proposalsSlider = $("#proposals_slider");
    const $loading = $proposalsSlider.find(".loading");

    $loading.hide();

    $("#filters-form").on("change", (event) => {
        $loading.show();

        const $processesGridCards = $proposalsSlider.find(".glide");
        let $target = $(event.target);

        if (!$target.is("a")) {
            $target = $target.parents("a");
        }
        // $processesGridCards.empty();
        // $loading.show();

        // if (window.history) {
        //     window.history.pushState(null, null, $target.attr("href"));
        // }

        const $proposalsSliderContent = $('#proposals_glide_items');
        const filterURIParams = filterForm._currentStateAndPath()[0];

        $.ajax({
            url: `/proposals_slider/refresh_proposals${filterURIParams}`, // Use the new route
            method: 'GET',
            success: function(response) {
                if (response === '') {
                    console.log($proposalsSliderContent)
                    // $proposalsSliderContent.html("<p>No proposals found</p>");
                } else {

                    console.log(response)
                    for (let i = 0; i < response.length; i++) {
                        $proposalsSliderContent.append(
                            proposalSlideTemplate(response[i])
                        );
                    }
                    // $proposalsSliderContent.html(response);
                    // $proposalsSliderContent.html("<%= render partial: \"decidim/shared/homepage_proposals/slider_proposals\", locals: { glanced_proposals: glanced_proposals } %>");
                }
                $loading.hide();
            },
            error: ((err) => {
                $loading.hide();
                console.log(err)
                console.log('Error refreshing proposals slider');
            })
        });
        // window.location.replace(filterForm._currentStateAndPath()[0])
    });

    $(".button--clear-filters").on("click", (event) => {
        event.preventDefault();
        window.history.pushState(null, null, window.location.pathname);
        window.location.reload();
    });
});

const proposalSlideTemplate = (proposal) => {
    return `
<div class="column glide__slide">
  <div class="card card--proposal card--stack">
<a href="${proposal.url}">
      <div class="card--header">
      </div>
</a>

    <div class="card--content text-center margin-top-1">
<a href="${proposal.url}">
        <h3 class="card__title">${proposal.title}</h3>
</a>
      <div class="card__text--paragraph padding-top-1">
        <p>${proposal.body}</p>
      </div>
<a href="${proposal.url}">
        <div class="card__button align-bottom">
          <span class="button button--secondary">En savoir plus</span>
        </div>
</a>
    </div>
  </div>
</div>    
    
`
};