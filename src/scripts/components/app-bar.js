class appBar extends HTMLElement {
  connectedCallback () {
    this.render()
  }

  render () {
    this.innerHTML = `
    <header class="app-bar">
        <div class="app-bar__menu">
            <button id="hamburgerButton" aria-label="hamburger button">☰</button>
        </div>
        <div class="app-bar__brand">
            <h1>alanaExplore</h1>
        </div>
        <nav id="navigationDrawer" class="app-bar__navigation">
        <ul>
            <li class="nav__item"><a href="/">Home</a></li>
            <li class="nav__item"><a rel="noopener" target="_blank" href="https://www.linkedin.com/in/ratridesy">About me</a></li>
        </ul>
        </nav>
    </header>
        `
  }
}

customElements.define('app-bar', appBar)
