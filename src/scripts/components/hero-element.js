class heroelement extends HTMLElement {
  connectedCallback () {
    this.render()
  }

  render () {
    this.innerHTML = `
          <div class="hero__container">
              <div class="hero__inner">
                  <h2 class="hero__title">Where your hunger meets our featured restaurants!</h2>
                  <p class="hero__tagline">See our restaurant recommendation below and find out your favorite foods there.</p>
              </div>
          </div>
          `
  }
}

customElements.define('hero-element', heroelement)
