import Glide from "@glidejs/glide";
import GlideBuilder from "./glideBuilder";
export default class Slider {
    constructor(proposalsSelector, proposalsItemsSelector, filterForm) {
        this.proposalSlider = $(proposalsSelector);
        this.proposalsItems = $(proposalsItemsSelector);
        this.filterForm = filterForm;
        this.loading = this.proposalSlider.find(".loading");
        this.build();
    }

    APIUrl() {
        return '/proposals_slider/refresh_proposals' + this.filterURIParams();
    }

    set Items(ary) {
        this.items = ary;
    }

    build() {
        this.glide = new Glide('.glide', {
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
        })
    }

    filterURIParams() {
        return this.filterForm._currentStateAndPath()[0];
    }

    start() {
        this.startLoading()
        const glideBuilder = new GlideBuilder(null)

        $.ajax({
            url: this.APIUrl(),
            method: 'GET',
            success: ((res) => {
                if (res === '') {
                    this.proposalsItems.append(glideBuilder.toGlideItem())
                } else {
                    for (let i = 0; i < res.length; i++) {
                        glideBuilder.item = res[i]
                        this.proposalsItems.append(glideBuilder.toGlideItem());
                    }
                }
            }),
            error: ((err) => {
                this.proposalsItems.append(glideBuilder.toGlideItem())
            }),
            complete: (() => {
                console.log("Should mount Glide slider")
                this.endLoading()
                this.glide.mount();
            })
        });
    }

    startLoading() {
        this.clearItems();
        this.loading.show();
    }

    endLoading() {
        this.loading.hide();
    }

    clearItems() {
       this.proposalsItems.empty();
    }
}
