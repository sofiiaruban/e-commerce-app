class CustomDisclosure extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })

    this.shadowRoot.innerHTML = `
      <style>
        /* CSS styles here */
      </style>
      <details class="products-info">
        <summary class="summary">
          <div class="attention-sign">
            <img class="alert-circle" src="${this.attractionimg}" alt="alert circle">
            <span class="alpha">ALPHA</span>
          </div>
          <p class="message">Important info regarding our service</p>
          <img class="arrow-down" src="${this.arrowimg}" alt="arrow down">
        </summary>
        <p>
          <slot></slot>
        </p>
      </details>
    `

    this.attractionimg = './assets/alert-circle.png'
    this.arrowimg = './assets/chevron-down.png'
  }
}

customElements.define('custom-disclosure', CustomDisclosure)
