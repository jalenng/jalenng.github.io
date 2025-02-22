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
      const maxBalls = 3;
      let ballsSpawned = 0;

      // create event listener for button
      const tabButton = this.shadowRoot.querySelector("#home-tab");
      const buttonImg = this.shadowRoot.querySelector(".home-item-image");

      tabButton.classList.add("pulsate");

      const spawnBall = (e) => {
        navigator.vibrate(1);

        const bounceDampening = 0.2;
        const gravity = 9.81;
        const growSpeed = 50;
        const terminalVy = 500;
        const vThresholdForVibrate = 5;

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

        function getWindowPosInfo() {
          return {
            left: window.screenX,
            top: window.screenY,
            right: window.screenX + window.innerWidth,
            bottom: window.screenY + window.innerHeight,
            width: window.innerWidth,
            height: window.innerHeight,
            scrollY: window.scrollY,
          };
        }

        let lastWindowInfo = getWindowPosInfo();

        function updateBall(timestamp) {
          const currWindowInfo = getWindowPosInfo();

          const timeDelta = (timestamp - startTime) / 100 || 0;

          const minX = ballData.radius;
          const minY = -ballData.radius;
          const maxX = currWindowInfo.width - ballData.radius;
          const maxY = currWindowInfo.height - ballData.radius;

          const windowDLeft = currWindowInfo.left - lastWindowInfo.left;
          const windowDRight = currWindowInfo.right - lastWindowInfo.right;
          const windowDTop = currWindowInfo.top - lastWindowInfo.top;
          const windowDBottom = currWindowInfo.bottom - lastWindowInfo.bottom;
          const scrollDY = currWindowInfo.scrollY - lastWindowInfo.scrollY;

          // Grow ball
          if (ballData.radius < ballData.targetRadius) {
            const diffRation = 1 - ballData.radius / ballData.targetRadius;
            ballData.radius += diffRation * growSpeed * timeDelta;
          }

          // Update vy
          ballData.vy += gravity * timeDelta;
          const scrollVy = timeDelta === 0 ? 0 : scrollDY / timeDelta;
          ballData.vy -= scrollVy * 0.1;
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

          // Account for screenX and screenY change to keep ball relative to window
          ballData.x -= windowDLeft;
          ballData.y -= windowDTop;
          // ballData.y -= scrollDY;

          // Handle bounce and edge interactions
          let hasCollision = false;
          let impulseVX = 0;
          let impulseVY = 0;
          // Left
          if (ballData.x <= minX) {
            hasCollision = true;
            ballData.vx *= -(1 - Math.random() * bounceDampening);
            ballData.vx += windowDLeft / timeDelta;
            impulseVX = ballData.vx;
          }
          // Right
          if (ballData.x >= maxX) {
            hasCollision = true;
            ballData.vx *= -(1 - Math.random() * bounceDampening);
            ballData.vx += windowDRight / timeDelta;
            impulseVX = ballData.vx;
          }
          // Top (just for preventing ball from going off screen)
          if (ballData.y <= minY) {
            // ballData.vy *= -(1 - Math.random() * bounceDampening);
            ballData.vy = 0;
          }
          // Bottom
          if (ballData.y >= maxY) {
            hasCollision = true;
            ballData.vy *= -(1 - Math.random() * bounceDampening);
            ballData.vy -= windowDBottom / timeDelta;
            impulseVY = ballData.vy;
          }
          if (hasCollision) {
            const netImpulseV = Math.sqrt(impulseVX ** 2 + impulseVY ** 2);
            if (netImpulseV > vThresholdForVibrate) {
              navigator.vibrate(netImpulseV / 2);
            }
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

          // Remember last window info
          lastWindowInfo = currWindowInfo;

          requestAnimationFrame(updateBall);
        }

        // Create ballContainer
        const ballContainerElem = document.createElement("div");
        ballContainerElem.style.position = "fixed";
        ballContainerElem.style.top = "0px";
        ballContainerElem.style.bottom = "0px";
        ballContainerElem.style.left = "0px";
        ballContainerElem.style.right = "0px";
        ballContainerElem.style.overflow = "hidden";
        ballContainerElem.style.pointerEvents = "none";
        ballContainerElem.style.zIndex = "9999";
        document.body.appendChild(ballContainerElem);

        // Create ballElem
        const ballElem = document.createElement("img");
        ballElem.style.position = "absolute";
        ballElem.style.transformOrigin = "center";
        ballElem.src = buttonImg.src;
        updateBall();
        ballContainerElem.appendChild(ballElem);
      };

      const handleTabButtonClick = (e) => {
        e.preventDefault();
        spawnBall(e);
        ballsSpawned++;
        if (ballsSpawned >= maxBalls) {
          buttonImg.style.visibility = "hidden";
          tabButton.classList.remove("pulsate");
          tabButton.removeEventListener("click", handleTabButtonClick);
          tabButton.addEventListener("click", (e) => e.preventDefault());
        }
      };

      tabButton.addEventListener("click", handleTabButtonClick);
    }
  }
}

customElements.define("site-header", SiteHeader);
