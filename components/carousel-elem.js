class CarouselElem extends HTMLElement {
  constructor() {
    super();

    // Create a shadow root
    this.attachShadow({ mode: "open" });

    const template = document.createElement("template");
    template.innerHTML = `
    <link rel="stylesheet" href="styles/global.css">
    <link rel="stylesheet" href="components/carousel-elem.css">
    
    <div class="carousel">
      <div id="scrollable" class="carousel-scrollable">
        <slot></slot>
      </div>
    </div>
    `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.mouseDown = false;
    this.dragging = false;
    this.startX = 0;
    this.deltaX = 0;
    this.animationId = null;
  }
  connectedCallback() {
    this.scrollableDiv = this.shadowRoot.querySelector("#scrollable");

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);

    this.scrollableDiv.addEventListener("mousedown", this.handleMouseDown);
    this.scrollableDiv.addEventListener("mouseup", this.handleMouseUp);
    this.scrollableDiv.addEventListener("mouseleave", this.handleMouseLeave);
    this.scrollableDiv.addEventListener("mousemove", this.handleMouseMove);
  }
  handleMouseDown(event) {
    event.preventDefault();
    event.stopPropagation();
    this.mouseDown = true;
    this.startX = event.clientX;
    cancelAnimationFrame(this.animationId);
  }
  handleMouseUp(event) {
    event.preventDefault();
    event.stopPropagation();
    this.endDrag();
  }
  handleMouseLeave() {
    this.endDrag();
  }
  endDrag() {
    this.mouseDown = false;
    this.dragging = false;
    this.startX = 0;
    this.animateMomentum();
    setTimeout(() => this.scrollableDiv.classList.remove("grabbing"));
  }
  handleMouseMove(event) {
    if (this.mouseDown) {
      this.dragging = true;
      this.scrollableDiv.classList.add("grabbing");
    }
    if (this.dragging) {
      this.deltaX = event.clientX - this.startX;
      this.scrollableDiv.scrollLeft -= this.deltaX;
      this.startX = event.clientX;
    }
  }
  animateMomentum() {
    const decayRate = 0.9; // Adjust this value for faster/slower decay
    const threshold = 1; // Minimum velocity to continue scrolling
    const maxVelocity = 100; // Maximum velocity to prevent excessive scrolling

    const animate = () => {
      this.scrollableDiv.scrollLeft -= this.deltaX;
      this.deltaX *= decayRate;

      if (
        Math.abs(this.deltaX) > threshold &&
        Math.abs(this.deltaX) < maxVelocity
      ) {
        this.animationId = requestAnimationFrame(animate);
      }
    };

    animate();
  }
  disconnectedCallback() {
    this.scrollableDiv.removeEventListener("mousedown", this.handleMouseDown);
    this.scrollableDiv.removeEventListener("mouseup", this.handleMouseUp);
    this.scrollableDiv.removeEventListener("mouseleave", this.handleMouseLeave);
    this.scrollableDiv.removeEventListener("mousemove", this.handleMouseMove);
  }
}

customElements.define("carousel-elem", CarouselElem);
