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

    start() {
        this.startLoading()
        const glideBuilder = new GlideBuilder(null)

        $.ajax({
            url: this.APIUrl(),
            method: 'GET',
            success: ((res) => {
                // console.table(res)
                if (res.length > 0) {
                    for (let i = 0; i < res.length; i++) {
                        glideBuilder.item = res[i]
                        this.proposalsItems.append(glideBuilder.toGlideItem());
                        $(".glide__bullets > .glide__bullet:last").before(glideBuilder.bullet(i));
                    }
                } else {
                    this.proposalsItems.append(glideBuilder.toGlideItem());
                    $(".glide__bullets > .glide__bullet:last").before(glideBuilder.bullet(0));
                }
            }),
            error: (() => {
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
        $(".glide__bullet_idx").empty();
    }
}
