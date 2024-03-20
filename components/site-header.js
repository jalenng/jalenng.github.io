class SiteHeader extends HTMLElement {
  constructor() {
    super();

    // Create a shadow root
    this.attachShadow({ mode: "open" });

    const template = document.createElement("template");
    template.innerHTML = `
      <link rel="stylesheet" href="styles/global.css">
      <link rel="stylesheet" href="components/site-header.css">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.2/font/bootstrap-icons.min.css">
      
      <header class="header">
        <!-- jalenng -->
        <div class="tab-item home-item">
          <a href="/">
            <img src="img/profile.png" width="32" height="32" />
            <div class="tab-item__label">
              jalenng
            </div>
          </a>
        </div>
        <ul class="tab-list">
          <!-- games -->
          <li data-path="games" class="tab-item">
            <a href="games">
              <i class="bi bi-dpad unselected-icon"></i>
              <i class="bi bi-dpad-fill selected-icon"></i>
              <div class="tab-item__label">
                games
              </div>
            </a>
          </li>
          <!-- projects -->
          <li data-path="projects" class="tab-item">
            <a href="projects">
              <i class="bi bi-folder unselected-icon"></i>
              <i class="bi bi-folder-fill selected-icon"></i>
              <div class="tab-item__label">
                projects
              </div>
            </a>
          </li>
          <!-- cv -->
          <!-- <li data-path="cv" class="tab-item">
            <a href="cv">
              <i class="bi bi-file-text unselected-icon"></i>
              <i class="bi bi-file-text-fill selected-icon"></i>
              <div class="tab-item__label">
                cv
              </div>
            </a>
          </li> -->
        </ul>
      </header>
    `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
  connectedCallback() {
    // handle path attribute
    const path = this.getAttribute("path");
    const query = `.tab-item[data-path="${path}"]`;
    const elem =
      this.shadowRoot.querySelector(query) ||
      this.shadowRoot.querySelector(".home-item");
    elem.classList.add("selected");

    // handle hide-tabs attribute
    const hideTabs = this.hasAttribute("hide-tabs");
    if (hideTabs) {
      const tabsElem = this.shadowRoot.querySelector(".tab-list");
      tabsElem.classList.add("hidden");
    }
  }
}

customElements.define("site-header", SiteHeader);
