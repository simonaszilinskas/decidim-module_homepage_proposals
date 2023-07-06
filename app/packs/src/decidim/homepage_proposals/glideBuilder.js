import Glide from "@glidejs/glide";

export default class GlideBuilder {
    constructor(selector = '.glide', type = 'carousel') {
        this.type = type
        this.setOpts()
        this.pervView = GlideBuilder.defaultPervView();
        this.breakpoints = GlideBuilder.defaultBreakpoints();
        this.glide = new Glide(selector, this.options)

        this.bindings()
    }

    static defaultPervView() {
        return 4;
    }

    get perView() {
        return this.pervView;
    }

    // Set pervView, must be between 1 and 4 excluded
    // Not valid when :
    // * pervView < 1 : Then placeholder is added at ./glideItems/Manager.js:122
    // * pervView > 4 : Then max pervView must be 4
    set pervView(pervView) {
        if (pervView > 0 && pervView < 4) {
            this.pervView = pervView;
        }
    }

    static defaultBreakpoints() {
        return { 1024: { perView: 3 }, 768: { perView: 2 }, 480: { perView: 1 } };
    }

    get breakpoints() {
        return this.breakpoints;
    }

    set breakpoints(pervView) {
        if (pervView > 0 && pervView < 4) {
            let breakpoints;
            switch (pervView) {
                case 2:
                    breakpoints = { 1024: {perView: 2}, 768: {perView: 2}, 480: {perView: 1} };
                    break;
                case 1:
                    breakpoints = { 1024: {perView: 1}, 768: {perView: 1}, 480: {perView: 1} };
                    break;
                default:
                    breakpoints = GlideBuilder.defaultBreakpoints();
            }
            this.breakpoints = breakpoints;
        }
    }

    destroy() {
        this.glide.destroy();
    }

    disable() {
        this.glide.disable();
    }

    mount() {
        this.glide.mount()
    }

    bindings() {
    this.glide.on("run", () => {
            let bulletNumber = this.glide.index;
            let $glideBullets = $(".glide__bullets");

            $($glideBullets.children()).css("color", "lightgrey");
            $($glideBullets.children().get(bulletNumber + 1)).css("color", "grey");
        });
    }

    setOpts() {
        this.options = {
            type: this.type,
            startAt: 0,
            autoplay: 0,
            perView: this.pervView,
            breakpoints: this.breakpoints,
            hoverpause: true,
            perTouch: 1
        }
    }
}
