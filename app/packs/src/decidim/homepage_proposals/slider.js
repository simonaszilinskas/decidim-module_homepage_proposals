import Glide from "@glidejs/glide";
import GlideItem from "./glideItem";
import FormFilterComponents from "src/decidim/form_filter.js";
import GlideBuilder from "./glideBuilder";

export default class Slider {
    constructor($proposalsSlider, $proposalsGlideItems, $filterForm) {
        this.proposalSlider = $proposalsSlider;
        this.proposalsItems = $proposalsGlideItems;
        this.filterForm = new FormFilterComponents($filterForm);
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
        if (this.glide !== undefined) {
            this.glide.glide.disable()
        }
        return $.ajax({
            url: this.APIUrl(),
            method: 'GET',
            success: ((res) => {
                console.log(res)
                this.generateGlide(res)
            }),
            error: ((err) => {
                console.log(err)
                const glideItem = new GlideItem(null)
                this.proposalsItems.append(glideItem.toGlideItem())
                $(".glide__bullets > .glide__bullet:last").before(glideItem.bullet(0));
            }),
            complete: (() => {
                this.endLoading();
                this.glide = new GlideBuilder('.glide', 'carousel');
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
        $(".glide__bullet.glide__bullet_idx").remove();
    }

    generateGlide(res) {
        if (res.length <= 0) {
            const glideItem = new GlideItem(null)
            this.proposalsItems.append(glideItem.unknown())
            $(".glide__bullets > .glide__bullet:last").before(glideItem.bullet(0));
            for (let i = 0; i < 3; i++) {
                let glideItem = new GlideItem(res[i])
                this.proposalsItems.append(glideItem.placeholder());
            }
        } else {
            for (let i = 0; i < res.length; i++) {
                let glideItem = new GlideItem(res[i])
                this.proposalsItems.append(glideItem.toGlideItem());
                $(".glide__bullets > .glide__bullet:last").before(glideItem.bullet(i));
            }

            if (res.length < 4) {
                let missing = 4 - res.length

                for (let i = 0; i < missing; i++) {
                    let glideItem = new GlideItem(res[i])
                    this.proposalsItems.append(glideItem.placeholder());
                }
            }
        }
    }
}
