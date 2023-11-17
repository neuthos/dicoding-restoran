import 'regenerator-runtime' /* for async await transpile */
import '../styles/main.css'
import '../styles/responsive.css'
import '../styles/style.scss'
import '../scripts/components/app-bar.js'
import '../scripts/components/hero-element'
import '../../src/public/font-awesome.js'
import 'lazysizes'
import 'lazysizes/plugins/parent-fit/ls.parent-fit'
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

document.onreadystatechange = function () {
  if (document.readyState === 'complete') {
    splash.classList.add('display-none')
  }
}

const skipToContent = document.querySelector('.skip-link')
skipToContent.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    document.querySelector('#findresto').focus()
  }
})
