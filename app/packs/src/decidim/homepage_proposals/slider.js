import Glide from "@glidejs/glide";
import GlideBuilder from "./glideBuilder";
import FormFilterComponents from "src/decidim/form_filter.js";

export default class Slider {
    constructor($proposalsSlider, $proposalsGlideItems, $filterForm, glide) {
        this.proposalSlider = $proposalsSlider;
        this.proposalsItems = $proposalsGlideItems;
        this.filterForm = new FormFilterComponents($filterForm);
        this.glide = glide;
        this.loading = this.proposalSlider.find(".loading");
    }

    APIUrl() {
        return '/proposals_slider/refresh_proposals' + this.filterURIParams();
    }

    set Items(ary) {
        this.items = ary;
    }

    filterURIParams() {
        return this.filterForm._currentStateAndPath()[0];
    }

    async start() {
        this.startLoading()
        const glideBuilder = new GlideBuilder(null)

        return $.ajax({
            url: this.APIUrl(),
            method: 'GET',
            success: ((res) => {
                if (res.length > 0) {
                    for (let i = 0; i < res.length; i++) {
                        glideBuilder.item = res[i]
                        this.proposalsItems.append(glideBuilder.toGlideItem());
                        $(".glide__bullets > .glide__bullet:last").before(glideBuilder.bullet(i));
                    }
                } else {
                        glideBuilder.item = null;
                        this.proposalsItems.append(glideBuilder.toGlideItem());
                        $(".glide__bullets > .glide__bullet:last").before(glideBuilder.bullet(0));

                }

                return this.glide
            }),
            error: (() => {
                this.proposalsItems.append(glideBuilder.toGlideItem())
                return this.glide
            }),
            complete: (() => {

                console.log("Should mount Glide slider")
                this.endLoading();
                return this.glide;

                const itemsCount = this.proposalsItems.children().length
                this.glide.update({
                    // Add updated slides
                    breakpoints: {
                        1024: {
                            perView: itemsCount > 1 ? 4 : 1
                        },
                        768: {
                            perView: itemsCount > 1 ? 2 : 1
                        },
                        480: {
                            perView: 1
                        }
                    }
                });
                return this.glide;
            })
        });
    }

    startLoading() {
        // TODO: Clearing items crash Glide Library
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
