export default class GlideBuilder {
    constructor(proposal) {
        this.proposal = proposal;
    }

    set item(proposal) {
        this.proposal = proposal;
    }
    toGlideItem() {
        if (this.proposal === null) {
            return this.unknown();
        }

        return this.presenter();
    }

    presenter() {
        return `
      <div class="column glide__slide">
  <div class="card card--proposal card--stack">
<a href="${this.proposal.url}">
      <div class="card--header">
      </div>
</a>

    <div class="card--content text-center margin-top-1">
<a href="${this.proposal.url}">
        <h3 class="card__title">${this.proposal.title}</h3>
</a>
      <div class="card__text--paragraph padding-top-1">
        <p>${this.proposal.body}</p>
      </div>
<a href="${this.proposal.url}">
        <div class="card__button align-bottom">
          <span class="button button--secondary">Visit</span>
        </div>
</a>
    </div>
  </div>
</div>    
`
    }

    unknown() {
        return `
<div class="column glide__slide">
  <div class="card card--proposal card--stack">
    <div class="card--content text-center margin-top-1">
    <div class="callout warning">
        <h3>No matching proposals</h3>    
    </div>
    </div>
  </div>
</div>
`
    }
}
