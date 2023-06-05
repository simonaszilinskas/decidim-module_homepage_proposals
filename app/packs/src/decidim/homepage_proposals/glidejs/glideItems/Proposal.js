import GlideItem from "./GlideItem";

export default class Proposal extends GlideItem {
    constructor(obj) {
        super();
        this.title = obj.title;
        this.body = obj.body;
        this.image = obj.image;
        this.url = obj.url;
    }

    render() {
        return `<div class="column glide__slide">
<div class="card card--proposal card--stack">
    <a href="${this.url}">
      <div class="card--header"></div>
    </a>

    <div class="card--content text-center margin-top-1">
        <a href="${this.url}"><h3 class="card__title">${this.title}</h3></a>
        <div class="card__text--paragraph padding-top-1">
            <p>${this.body}</p>
        </div>
        <a href="${this.url}">
            <div class="card__button align-bottom">
                <span class="button button--secondary">Visit</span>
            </div>
        </a>
    </div>
  </div>
</div>`
    }

}