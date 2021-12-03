import { createRestoItemTemplate } from '../../templates/template-creator'

class FavoriteRestoSearchView {
  getTemplate () {
    return `
        <div id="resto-search-container">
          <input id="query" type="text">
          <h2 class="content__heading">Your Favorited Restaurant</h2>
            <div id="restos" class="restos">
    
            </div>
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
    this.showFavoriteRestos(restos)
  }

  showFavoriteRestos (restos = []) {
    let html

    if (restos.length) {
      html = restos.reduce((carry, resto) => carry.concat(createRestoItemTemplate(resto)), '')
    } else {
      html = this._getEmptyRestoTemplate()
    }

    document.getElementById('restos').innerHTML = html

    document.getElementById('restos').dispatchEvent(new Event('restos:updated'))
  }

  _getEmptyRestoTemplate () {
    return '<div class="resto-item__not__found">Resto not found to be shown</div>'
  }
}

export default FavoriteRestoSearchView
