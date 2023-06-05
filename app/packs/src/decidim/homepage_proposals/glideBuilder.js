import Glide from "@glidejs/glide";

export default class GlideBuilder {
    constructor(selector = '.glide', type = 'carousel') {
        this.type = type
        this.setOpts()
        this.glide = new Glide(selector, this.options)

        this.bindings()
    }

    static pervView() {
        return 4;
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
            $($(".glide__bullets").children()).css("color", "lightgrey");
            $($(".glide__bullets").children().get(bulletNumber + 1)).css("color", "grey");
        });
    }

    setOpts() {
        this.options = {
            type: this.type,
            startAt: 0,
            autoplay: 0,
            perView: GlideBuilder.pervView(),
            hoverpause: true,
            breakpoints: {
                1024: { perView: 3 }, 768: { perView: 2 }, 480: { perView: 1 }
            },
            perTouch: 1
        }
    }
}
