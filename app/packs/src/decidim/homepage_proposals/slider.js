import Glide from "@glidejs/glide";
import GlideItem from "./glideItem";
import FormFilterComponents from "src/decidim/form_filter.js";
import GlideBuilder from "./glideBuilder";

export default class Slider {
    constructor($proposalsSlider, $proposalsGlideItems, $filterForm) {
        this.proposalSlider = $proposalsSlider;
        this.proposalsItems = $proposalsGlideItems;
        this.filterForm = new FormFilterComponents($filterForm);
        // this.glide = new GlideBuilder('.glide', 'carousel', 4);
        this.loading = this.proposalSlider.find(".loading");
    }

    APIUrl() {
        return '/proposals_slider/refresh_proposals' + this.filterURIParams();
    }

    set itemsCount(length) {
        this.count = length;
    }

    filterURIParams() {
        return this.filterForm._currentStateAndPath()[0];
    }

    async start() {
        this.startLoading()
        const glideItem = new GlideItem(null)

        return $.ajax({
            url: this.APIUrl(),
            method: 'GET',
            success: ((res) => {
                this.itemsCount = res.length
                if (res.length > 0) {
                    for (let i = 0; i < res.length; i++) {
                        glideItem.item = res[i]
                        this.proposalsItems.append(glideItem.toGlideItem());
                        $(".glide__bullets > .glide__bullet:last").before(glideItem.bullet(i));
                    }
                } else {
                        this.proposalsItems.append(glideItem.toGlideItem());
                        $(".glide__bullets > .glide__bullet:last").before(glideItem.bullet(0));
                }
            }),
            error: (() => {
                this.itemsCount = 1
                this.proposalsItems.append(glideItem.toGlideItem())
                $(".glide__bullets > .glide__bullet:last").before(glideItem.bullet(0));
            }),
            complete: (() => {
                this.endLoading();
                let newGlide = new GlideBuilder('.glide', 'carousel', this.count);
                this.glide = newGlide
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
