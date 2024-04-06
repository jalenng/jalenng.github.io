const BEFORE_TYPE_DELAY = 1000;
const MIN_TYPE_DELAY = 80;
const MAX_TYPE_DELAY = 180;
const BEFORE_DELETE_DELAY = 5000;
const DELETE_DELAY = 50;

class SplashText extends HTMLElement {
  constructor() {
    super();

    // Create a shadow root
    this.attachShadow({ mode: "open" });

    const template = document.createElement("template");
    template.innerHTML = `
      <link rel="stylesheet" href="components/splash-text.css">
      <span class="splash-text"></span>
    `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.idx = null;
    this.startingMessage = "Hi, I'm Jalen.";
    this.messages = [
      "I like making stuff.",
      "Welcome.",
      "I like designing things.",
      "This is my creative expression.",
      "Check out the things I've made.",
      "These are my digital creations.",
      "I'm a night owl.",
    ];
  }
  connectedCallback() {
    this.startLoop();
  }
  async startLoop() {
    await this.showAndHideMessage(this.startingMessage);
    while (true) {
      // Select a random new index
      const lastIdx = this.idx;
      while (lastIdx === this.idx) {
        this.idx = Math.floor(Math.random() * this.messages.length);
      }

      // Select the message and display it
      const message = this.messages[this.idx];
      await this.showAndHideMessage(message);
    }
  }
  async showAndHideMessage(message) {
    const splashTextElem = this.shadowRoot.querySelector(".splash-text");

    // Wait
    splashTextElem.classList.add("blinking");
    await this.wait(BEFORE_TYPE_DELAY);

    // Populate
    splashTextElem.classList.remove("blinking");

    // (split into words)
    const words = message.split(" ").filter((word) => !!word);
    for (let i = 0; i < words.length; i++) {
      const word = [...words[i], " "];

      const wordSpan = document.createElement("span");
      wordSpan.classList.add("splash-text--word");
      splashTextElem.appendChild(wordSpan);

      // (split into characters/letters)
      for (let j = 0; j < word.length; j++) {
        const character = word[j];

        const charSpan = document.createElement("span");
        charSpan.classList.add("splash-text--character");
        charSpan.textContent = character;
        wordSpan.appendChild(charSpan);
        setTimeout(() => {
          charSpan.classList.add("enter");
        }, 100);
        await this.wait(
          MIN_TYPE_DELAY + Math.random() * (MAX_TYPE_DELAY - MIN_TYPE_DELAY)
        );
      }
    }

    // Wait
    splashTextElem.classList.add("blinking");
    await this.wait(BEFORE_DELETE_DELAY);

    // Remove
    splashTextElem.classList.remove("blinking");
    const getLastWordElem = () => splashTextElem.lastChild;
    const getLastLetterElem = () => getLastWordElem()?.lastChild;
    while (getLastWordElem()) {
      while (getLastLetterElem()) {
        getLastWordElem().removeChild(getLastLetterElem());
        await this.wait(DELETE_DELAY);
      }
      splashTextElem.removeChild(splashTextElem.lastChild);
    }
  }
  wait(time) {
    return new Promise((accept, _) => setTimeout(accept, time));
  }
}

customElements.define("splash-text", SplashText);
