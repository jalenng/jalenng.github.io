class CardElem extends HTMLElement {
  constructor() {
    super();

    // Create a shadow root
    this.attachShadow({ mode: "open" });

    const template = document.createElement("template");
    template.innerHTML = `
      <link rel="stylesheet" href="styles/global.css">
      <link rel="stylesheet" href="components/card-elem.css">
      
      <a class="card-elem">
      
        <div class="background">
          <slot name="background"></slot>
        </div>
      
        <div class="foreground">
          <slot></slot>
        </div>
      
      </a>
    `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
  connectedCallback() {
    // handle path attribute
    const href = this.getAttribute("href");
    const query = ".card-elem";
    const elem = this.shadowRoot.querySelector(query);
    elem.setAttribute("href", href);
  }
}

customElements.define("card-elem", CardElem);
