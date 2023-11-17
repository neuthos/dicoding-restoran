class heroelement extends HTMLElement {
  connectedCallback () {
    this.render()
  }

  render () {
    this.innerHTML = `
          <div class="hero__container">
              <div class="hero__inner">
                  <h2 class="hero__title">Welcome to our list resto!</h2>
                  <p class="hero__tagline">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex distinctio quibusdam sed fuga nobis esse repudiandae obcaecati expedita hic quae atque corporis velit sunt, aliquam cupiditate asperiores enim beatae earum</p>
              </div>
          </div>
          `
  }
}

customElements.define('hero-element', heroelement)
