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
        <nav class="tab-list">
          <!-- jalenng -->
            <a id="home-tab" href="/" class="tab-item home-item">
              <img class="home-item-image" src="img/profile.png" width="16" height="16" alt="Profile" />
              <div class="tab-item__label">
                jalenng
              </div>
            </a>
          <!-- games -->
            <a href="games" data-path="games" class="tab-item">
              <i class="bi bi-dpad unselected-icon"></i>
              <i class="bi bi-dpad-fill selected-icon"></i>
              <div class="tab-item__label">
                games
              </div>
            </a>
          <!-- projects -->
            <a href="projects" data-path="projects" class="tab-item">
              <i class="bi bi-folder unselected-icon"></i>
              <i class="bi bi-folder-fill selected-icon"></i>
              <div class="tab-item__label">
                projects
              </div>
            </a>
          <!-- cv -->
            <a href="cv" data-path="cv" class="tab-item">
              <i class="bi bi-file-text unselected-icon"></i>
              <i class="bi bi-file-text-fill selected-icon"></i>
              <div class="tab-item__label">
                cv
              </div>
            </a>
        </nav>
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

    const allowEasterEgg = this.hasAttribute("allow-easter-egg");
    if (allowEasterEgg) {
      // create event listener for button
      const tabButton = this.shadowRoot.querySelector("#home-tab");
      const buttonImg = this.shadowRoot.querySelector(".home-item-image");
      tabButton.addEventListener("click", (e) => {
        e.preventDefault();

        const bounceDampening = 0.2;
        const gravity = 9.81;
        const growSpeed = 100;
        const terminalVy = 500;

        const initRect = buttonImg.getBoundingClientRect();

        const originalRadius = initRect.width / 2;
        const ballData = {
          targetRadius: 84,
          originalRadius,
          radius: originalRadius,
          x: initRect.x + originalRadius,
          y: initRect.y + originalRadius,
          vx: Math.random() * 100 - 50,
          vy: Math.random() * -60,
          rotation: 0,
          vRot: 0,
        };

        let startTime;
        function updateBall(timestamp) {
          const timeDelta = (timestamp - startTime) / 100 || 0;

          const minX = window.scrollX + ballData.radius;
          const maxX = window.scrollX + window.innerWidth - ballData.radius;
          const maxY = window.scrollY + window.innerHeight - ballData.radius;

          // Grow ball
          if (ballData.radius < ballData.targetRadius) {
            const diffRation = 1 - ballData.radius / ballData.targetRadius;
            ballData.radius += diffRation * growSpeed * timeDelta;
          }

          // Update vy
          ballData.vy += gravity * timeDelta;
          ballData.vy = Math.max(
            -terminalVy,
            Math.min(terminalVy, ballData.vy)
          );

          // Update vrot
          ballData.vRot = ballData.vx / ballData.radius;

          // Update position and rotation
          ballData.x += ballData.vx * timeDelta;
          ballData.y += ballData.vy * timeDelta;
          ballData.rotation += ballData.vRot * timeDelta;

          // Handle bounce
          if (ballData.x <= minX || ballData.x >= maxX) {
            ballData.vx *= -(1 - Math.random() * bounceDampening);
          }
          if (ballData.y >= maxY) {
            ballData.vy *= -(1 - Math.random() * bounceDampening);
          }

          // Clamp position
          ballData.x = Math.max(minX, Math.min(maxX, ballData.x));
          ballData.y = Math.min(maxY, ballData.y);

          // Update the ball elem's style
          ballElem.style.left = `${ballData.x}px`;
          ballElem.style.top = `${ballData.y}px`;
          ballElem.style.width = `${ballData.radius * 2}px`;
          ballElem.style.height = `${ballData.radius * 2}px`;
          ballElem.style.transform = `translate(-50%,-50%) rotate(${ballData.rotation}rad)`;
          ballElem.style.filter = "var(--drop-shadow)";

          const ballGrowRatio =
            (ballData.radius - ballData.originalRadius) /
            (ballData.targetRadius - ballData.originalRadius);
          ballElem.style.borderRadius = `${50 * ballGrowRatio}%`;
          startTime = timestamp;

          requestAnimationFrame(updateBall);
        }

        // Create ballContainer
        const ballContainerElem = document.createElement("div");
        ballContainerElem.style.position = "absolute";
        ballContainerElem.style.top = "0px";
        ballContainerElem.style.bottom = "0px";
        ballContainerElem.style.left = "0px";
        ballContainerElem.style.right = "0px";
        ballContainerElem.style.overflow = "hidden";
        ballContainerElem.style.pointerEvents = "none";
        document.body.appendChild(ballContainerElem);

        // Create ballElem
        const ballElem = document.createElement("img");
        ballElem.style.position = "absolute";
        ballElem.style.zIndex = "9999";
        ballElem.style.transformOrigin = "center";
        ballElem.src = buttonImg.src;
        updateBall();
        ballContainerElem.appendChild(ballElem);

        // Hide original image
        // buttonImg.style.visibility = "hidden";
      });
    }
  }
}

customElements.define("site-header", SiteHeader);
