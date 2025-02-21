class BackToTop extends HTMLElement {
  constructor() {
    super();

    // Create a shadow root
    this.attachShadow({ mode: "open" });

    const template = document.createElement("template");
    template.innerHTML = `
      <link rel="stylesheet" href="styles/global.css">
      <link rel="stylesheet" href="components/back-to-top.css">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.2/font/bootstrap-icons.min.css">
      
      <section class="back-to-top animate-enter-exit">
      
        <button class="back-to-top-button" onclick="window.scrollTo({ top: 0, behavior: 'smooth' })">
          <div class="back-to-top-button--text">
            Back to top
          </div>
          <i class="bi bi-arrow-up"></i>
        </button>

        <div class="back-to-top--subtext">
          Back to top
        </div>

      </section>
    `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define("back-to-top", BackToTop);
