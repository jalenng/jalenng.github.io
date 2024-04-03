class PageLayout extends HTMLElement {
  constructor() {
    super();

    // Create a shadow root
    this.attachShadow({ mode: "open" });

    const template = document.createElement("template");
    template.innerHTML = `
      <link rel="stylesheet" href="styles/global.css">
      <link rel="stylesheet" href="components/page-layout.css">
      
      <div class="page-nav">
        <slot name="nav"></slot>
      </div>
      <main class="page-content">
        <slot></slot>
      </main>
    `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define("page-layout", PageLayout);
