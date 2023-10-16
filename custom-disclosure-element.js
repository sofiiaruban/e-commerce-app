class CustomDisclosure extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.shadowRoot.innerHTML = `
            <style>
              .products-info {
                background-color: black;
                color: #FCF7E6;
                border-radius: 4px;
                padding: 1rem;
                margin-bottom: 3rem;
                max-width: 100%;
                font-family: 'Space Grotesk', sans-serif;
              }
              .summary {
                display: flex;
                gap: 12px;
              }
              .attention-sign {
                display: flex;
                gap:2px; 
                justify-content: center;
                align-items: center;
              }
              .alert-circle {
                margin-right: 4px;
              }
              .alpha {
                font-size: 1rem;
                font-weight: 700;
              }
              .message  {
                font-size: 500;
                font-size: 0.75rem;
                padding-top: 0.25rem;
                flex-grow: 1;
              }
              .arrow-down {
                cursor: pointer;
              }
            </style>
            <details class="products-info">
                <summary class="summary">
                    <div class="attention-sign">
                        <img class="alert-circle" src="./assets/alert-circle.svg" alt="alert circle">
                        <span class="alpha">ALPHA</span>
                    </div>
                    <p class="message">Important info regarding our service</p>
                    <img class="arrow-down" src="./assets/chevron-down.svg" alt="arrow down">
                </summary>
                <p>
                    <slot></slot>
                </p>
            </details>
        `
    }
}

customElements.define('custom-disclosure', CustomDisclosure)