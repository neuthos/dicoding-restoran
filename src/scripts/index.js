import 'regenerator-runtime' /* for async await transpile */
import '../styles/main.css'
import '../styles/responsive.css'
import '../scripts/components/app-bar.js'
import '../scripts/components/hero-element'
import App from './views/app'
import swRegister from './utils/sw-register'

const app = new App({
  button: document.querySelector('#hamburgerButton'),
  drawer: document.querySelector('#navigationDrawer'),
  content: document.querySelector('#findresto')
})

window.addEventListener('hashchange', () => {
  app.renderPage()
})

window.addEventListener('load', () => {
  app.renderPage()
  swRegister()
})

const splash = document.querySelector('.splash')

document.addEventListener('DOMContentLoaded', (e) => {
  setTimeout(() => {
    splash.classList.add('display-none')
  }, 3000)
})