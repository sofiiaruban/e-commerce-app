class CustomDisclosure extends HTMLElement {
  static get observedAttributes() {
    return ['attractionimg', 'arrowimg']
  }

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }
  connectedCallback() {
    this.render()
  }
  render() {
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
        width: 20px;
        height: 20px;
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
        width: 24px;
        height: 24px;
      }
    </style>
     <details class="products-info">
       <summary class="summary">
         <div class="attention-sign">
           <img class="alert-circle" src="https://cdn.pixabay.com/photo/2023/10/16/16/59/16-59-29-381_1280.png" alt="alert circle" />
           <span class="alpha">ALPHA</span>
         </div>
         <p class="message">Important info regarding our service</p>
         <img class="arrow-down" src="https://cdn.pixabay.com/photo/2023/10/16/17/04/17-04-27-888_1280.png" alt="arrow down" />
       </summary>
       <p>
         <slot></slot>
       </p>
     </details>
   `
  }
}

customElements.define('custom-disclosure', CustomDisclosure)
