class CardElem extends HTMLElement {
  constructor() {
    super();

    // Create a shadow root
    this.attachShadow({ mode: "open" });

    const template = document.createElement("template");
    template.innerHTML = `
      <link rel="stylesheet" href="styles/global.css">
      <link rel="stylesheet" href="components/card-elem.css">
      
      <div class="card-elem">
      
        <div class="background">
          <slot name="background"></slot>
        </div>
      
        <div class="foreground">
          <slot></slot>
        </div>
      
      </div>
    `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
  connectedCallback() {}
}

customElements.define("card-elem", CardElem);
