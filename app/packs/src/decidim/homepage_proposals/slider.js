import FormFilterComponents from "src/decidim/form_filter.js";
import Glide from '@glidejs/glide'

$(() => {
    const glide = new Glide('.glide', {
        type: 'carousel',
        startAt: 0,
        perView: 4,
        autoplay: 2500,
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
    });

    const $proposalsSliderContent = $('#proposals_glide_items');
    const filterForm = new FormFilterComponents($('#filters-form'));
    const filterURIParams = filterForm._currentStateAndPath()[0];

    $.ajax({
        url: `/proposals_slider/refresh_proposals${filterURIParams}`, // Use the new route
        method: 'GET',
        success: function (response) {
            if (response === '') {
                console.log("Empty response")
                // console.log($proposalsSliderContent)
                // $proposalsSliderContent.html("<p>No proposals found</p>");
            } else {
                for (let i = 0; i < response.length; i++) {
                    $proposalsSliderContent.append(
                        proposalSlideTemplate(response[i])
                    );
                }
                glide.mount();
            }
        },
        error: ((err) => {
            console.log(err)
            console.log('Error refreshing proposals slider');
        })
    });

    glide.on("run", function () {
        let bulletNumber = glide.index;
        $($(".glide__bullets").children()).css("color", "lightgrey");
        $($(".glide__bullets").children().get(bulletNumber + 1)).css("color", "grey");
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
}