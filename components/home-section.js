class HomeSection extends HTMLElement {
  constructor() {
    super();

    // Create a shadow root
    this.attachShadow({ mode: "open" });

    const template = document.createElement("template");
    template.innerHTML = `
      <link rel="stylesheet" href="styles/global.css">
      <link rel="stylesheet" href="components/home-section.css">
      
      <section class="home-section">
        <h2>
          <div class="header-left">
            <slot name="header-left"></slot>
          </div>
          <div class="header-right">
            <slot name="header-right"></slot>
          </div>
        </h2>
        <slot></slot>
      </section>
    `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
  connectedCallback() {}
}

customElements.define("home-section", HomeSection);
