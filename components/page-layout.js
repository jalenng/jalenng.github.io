const MAX_CONTENT_WIDTH = 1000;

class PageLayout extends HTMLElement {
  constructor() {
    super();

    // Create a shadow root
    this.attachShadow({ mode: "open" });

    const template = document.createElement("template");
    template.innerHTML = `
      <link rel="stylesheet" href="styles/global.css">
      <link rel="stylesheet" href="components/page-layout.css">
      
      <div id="pageLayout" class="page-layout">
        <div class="page-nav">
          <slot name="nav"></slot>
        </div>
        <div class="page-content">
          <slot></slot>
        </div>
      </div>
    `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
  connectedCallback() {
    this.pageLayout = this.shadowRoot.querySelector("#pageLayout");

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      const width = entry.borderBoxSize[0].inlineSize;
      const paddingWidth = Math.max(0, width - MAX_CONTENT_WIDTH) / 2;
      this.updatePaddingWidth(paddingWidth);
    });
    resizeObserver.observe(this.pageLayout);
  }
  updatePaddingWidth(paddingWidth) {
    this.pageLayout.style.setProperty(
      "--side-padding-size",
      `${paddingWidth}px`
    );
  }
  disconnectedCallback() {
    this.resizeObserver.disconnect();
  }
}

customElements.define("page-layout", PageLayout);
