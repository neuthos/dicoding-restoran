class appBar extends HTMLElement {
  connectedCallback () {
    this.render()
  }

  render () {
    this.innerHTML = `
    <header class="app-bar">
        <div class="app-bar__menu">
            <button id="hamburgerButton">☰</button>
        </div>
        <div class="app-bar__brand">
            <h1>DAHARin Apps 🍽️</h1>
        </div>
        <nav id="navigationDrawer" class="app-bar__navigation">
        <ul>
            <li class="nav__item"><a href="index.html">Home</a></li>
            <li class="nav__item"><a href="#/like">Favorite</a></li>
            <li class="nav__item"><a target="_blank" href="https://www.linkedin.com/in/ubbadahala">About Us</a></li>
        </ul>
        </nav>
    </header>
        `
  }
}

customElements.define('app-bar', appBar)
