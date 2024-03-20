class ContentContainer extends HTMLElement {
  constructor() {
    super();

    // Create a shadow root
    this.attachShadow({ mode: "open" });

    const template = document.createElement("template");
    template.innerHTML = `
      <link rel="stylesheet" href="components/content-container.css">

      <section class="content-container">
        <slot></slot>
      </section>
    `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
  connectedCallback() {}
}

customElements.define("content-container", ContentContainer);
