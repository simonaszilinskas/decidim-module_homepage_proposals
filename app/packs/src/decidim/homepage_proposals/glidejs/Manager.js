import GlideItem from "../glideItem";
import FormFilterComponents from "src/decidim/form_filter.js";
import GlideBuilder from "../glideBuilder";


// Manager communicates with API and build the HTML for the Glide.js carousel
// Example :
// let manager = new Manager($proposalsSlider, $proposalsGlideItems, $glideBullets, $formFilter)
// manager.start().then(() => manager.glide.mount())
//
// @return - Instance of Manager
export default class Manager {
    constructor($proposalsSlider, $proposalsGlideItems, $glideBullets, $formFilter) {
        this.$proposalSlider = $proposalsSlider;
        this.$proposalsGlideItems = $proposalsGlideItems;
        this.formFilterComponent = new FormFilterComponents($formFilter);
        this.$loading = this.$proposalSlider.find(".loading");
    }

    // @return String - API URL with filter params
    APIUrl() {
        return '/proposals_slider/refresh_proposals' + this.filterURIParams();
    }

    // @return String - Filter params query string
    filterURIParams() {
        return this.formFilterComponent._currentStateAndPath()[0];
    }

    // Clears Glide carousel and display loader
    // @return void
    startLoading() {
        this.clearGlideItems();
        this.$loading.show();
    }

    // Hide loader
    // @return void
    endLoading() {
        this.$loading.hide();
    }

    // Clears glide items and glide bullets
    // @return void
    clearGlideItems() {
        this.$proposalsGlideItems.empty();
        $(".glide__bullet.glide__bullet_idx").remove()
    }

    // We must disable existing glide carousel before refresh
    // @return void
    disableGlide() {
        if (this.glide !== undefined) {
            this.glide.disable()
        }
    }

    // Send request to API and create items received in Glide.js carousel
    // @return this.glide
    start() {
        this.startLoading();
        this.disableGlide()

        $.get(this.APIUrl())
            .done((res) => {
                this.generateGlides(res)
            })
            .fail(() => {
                this.generateGlides([])
            })
            .always((res) => {
                this.endLoading();
                this.glide = new GlideBuilder('.glide', 'carousel');

                if (res.length <= 1) {
                    this.glide.disable()
                }
                console.log(this.glide)
                this.glide.mount()
            })
    }

    // Creates Glide Items
    // @return void
    generateGlides(res) {
        if (res.length <= 0) {
            this.createProposalsNotFound();
            return;
        }

        this.createProposals(res)
    }

    // Create Glide Items with:
    // - A Not Found GlideItem
    // - 3 placeholders
    // @return void
    createProposalsNotFound() {
        const glideItem = new GlideItem(null)
        this.$proposalsGlideItems.append(glideItem.unknown())
        $(".glide__bullets > .glide__bullet:last").before(glideItem.bullet(0));

        for (let i = 0; i < GlideBuilder.pervView() - 1; i++) {
            this.$proposalsGlideItems.append(glideItem.placeholder());
        }
    }

    // Create Glide Items proposals, if proposals length is smaller than GlideBuilder.pervView() (default: 4)
    // Then it creates placeholders until reaching 4 Glide Items
    // @return void
    createProposals(proposals) {
        for (let i = 0; i < proposals.length; i++) {
            let glideItem = new GlideItem(proposals[i])
            this.$proposalsGlideItems.append(glideItem.toGlideItem());
            $(".glide__bullets > .glide__bullet:last").before(glideItem.bullet(i));
        }

        if (proposals.length < GlideBuilder.pervView()) {
            let missingCount = GlideBuilder.pervView() - proposals.length

            for (let i = 0; i < missingCount; i++) {
                this.$proposalsGlideItems.append(new GlideItem(null).placeholder());
            }
        }
    }
}
