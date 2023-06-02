import Glide from "@glidejs/glide";

export default class GlideBuilder {
    constructor(selector = '.glide', type = 'carousel', total = 4) {
        this.type = type
        this.numberPerSlide(total)
        this.setOpts()
        this.glide = new Glide(selector, this.options)
        this.bindings()
    }

    destroy() {
        this.glide.destroy();
    }

    reload() {
        this.glide = new Glide('.glide', this.options).destroy();
        this.mount();
    }
    mount() {
        console.log(this.options)
        this.glide.mount()
    }

    bindings() {
    this.glide.on("run", () => {
            let bulletNumber = this.glide.index;
            $($(".glide__bullets").children()).css("color", "lightgrey");
            $($(".glide__bullets").children().get(bulletNumber + 1)).css("color", "grey");
        });
    }

    setOpts() {
        this.options = {
            type: this.type,
            startAt: 0,
            autoplay: 3500,
            perView: this.pervView,
            hoverpause: true,
            breakpoints: this.breakpoints,
            perTouch: 1
        }
    }

    setBreakpoints(total) {
        this.breakpoints = {
            1024: {
                perView: (total > 1) ? 3 : 1
            },
            768: {
                perView: (total > 1) ? 2 : 1
            },
            480: {
                perView: 1
            }
        }
    }

    setPervView(total) {
        this.pervView = (total > 1) ? 4 : 1
    }

    numberPerSlide(total) {
        this.setPervView(total)
        this.setBreakpoints(total)
    }
}
