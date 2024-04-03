class ProjectItem extends HTMLElement {
  constructor() {
    super();

    // Create a shadow root
    this.attachShadow({ mode: "open" });

    const template = document.createElement("template");
    template.innerHTML = `
      <link rel="stylesheet" href="components/project-item.css">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.2/font/bootstrap-icons.min.css">
      
      <article class="project-item">

        <div class="project-item__sticky">
          <slot></slot>
        </div>
    
        <div class="project-item__images">
          <slot name="images"></slot>
        </div>
      
      </article>
    `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define("project-item", ProjectItem);
