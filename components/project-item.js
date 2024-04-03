class ProjectItem extends HTMLElement {
  constructor() {
    super();

    // Create a shadow root
    this.attachShadow({ mode: "open" });

    const template = document.createElement("template");
    template.innerHTML = `
      <link rel="stylesheet" href="components/project-item.css">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.2/font/bootstrap-icons.min.css">
      
      <section class="project-item">

        <div class="project-item__sticky">
          <slot></slot>
        </div>
    
        <div class="project-item__images">
          <slot name="images"></slot>
        </div>
      
      </section>
    `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
  connectedCallback() {
    const stickyElem = this.shadowRoot.querySelector(".project-item__sticky");
    const entireElem = this.shadowRoot.querySelector(".project-item");
    const intersectionCallback = (entries, observer) => {
      entireElem.style.setProperty(
        "--intersection-ratio",
        entries[0].intersectionRatio
      );
    };
    const options = {
      threshold: Array.from({ length: 101 }, (_, i) => i / 100),
    };
    const intersectionObserver = new IntersectionObserver(
      intersectionCallback,
      options
    );
    intersectionObserver.observe(stickyElem);
  }
}

customElements.define("project-item", ProjectItem);
