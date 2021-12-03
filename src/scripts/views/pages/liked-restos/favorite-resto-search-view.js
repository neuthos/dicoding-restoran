import { createRestoItemTemplate } from '../../templates/template-creator'

class FavoriteRestoSearchView {
  getTemplate () {
    return `
        <div id="resto-search-container">
          <input id="query" type="text">
          <div class="resto-result-container">
            <ul class="restos">
            </ul>
          </div>
        </div>
      `
  }

  getFavoriteRestoTemplate () {
    return `
        <div class="content">
            <h2 class="content__heading">Your Favorited Restaurant</h2>
            <div id="restos" class="restos">
    
            </div>
        </div>
      `
  }

  runWhenUserIsSearching (callback) {
    document.getElementById('query').addEventListener('change', (event) => {
      callback(event.target.value)
    })
  }

  showRestos (restos) {
    let html

    if (restos.length > 0) {
      html = restos.reduce(
        (carry, resto) => carry.concat(`<li class="resto"><span class="resto__name">${resto.name || '-'}</span></li>`),
        ''
      )
    } else {
      html = '<div class="restos__not__found">Resto not found</div>'
    }

    document.querySelector('.restos').innerHTML = html

    document.getElementById('resto-search-container')
      .dispatchEvent(new Event('restos:searched:updated'))
  }

  showFavoriteRestos (restos = []) {
    let html

    if (restos.length) {
      html = restos.reduce((carry, resto) => carry.concat(createRestoItemTemplate(resto)), '')
    } else {
      html = '<div class="resto-item__not__found"></div>'
    }

    document.getElementById('restos').innerHTML = html

    document.getElementById('restos').dispatchEvent(new Event('restos:updated'))
  }
}

export default FavoriteRestoSearchView
