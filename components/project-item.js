class ProjectItem extends HTMLElement {
  constructor() {
    super();

    // Create a shadow root
    this.attachShadow({ mode: "open" });

    const template = document.createElement("template");
    template.innerHTML = `
      <link rel="stylesheet" href="components/project-item.css">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.2/font/bootstrap-icons.min.css">
      
      <div class="project-item">
      
        <div class="dashed-line"></div>
      
        <div class="project-item__icon">
          <slot name="icon"></slot>
        </div>
      
        <div class="project-item__content">
      
          <div class="project-item__header">
            <slot name="title"></slot>
            <slot name="description"></slot>
          </div>
      
          <div>
            <slot name="content"></slot>
          </div>
      
          <div class="project-item__footer">
          
            <div class="project-item-footer__left">
              <slot name="footer-left"></slot>
            </div>
            <div class="project-item-footer__right">
              <slot name="footer-right"></slot>
            </div>
            
          </div>
      
        </div>
      
      </div>
    `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
  connectedCallback() {}
}

customElements.define("project-item", ProjectItem);
