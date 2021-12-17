import { createRestoItemTemplate } from '../../templates/template-creator'

class FavoriteRestoSearchView {
  getTemplate () {
    return `
        <div id="resto-search-container">
          <h2 class="content__heading">Your Favorited Restaurant</h2>
          <div class="card search-bar">
            <h2>Find Your Favorited Resto</h2>
            <label class="input">
              <input class="input__field" id="query" type="text" placeholder=" " />
              <span class="input__label">Enter the resto name</span>
            </label>
          </div>
            
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
    return `
      <div id="resto-search-container">
          <div class="">
            <div class="resto-item__not__found"></div>
          </div>
            
      </div>

      <div id="resto-search-container">
          <div class="notfoundcard">
            <div class="resto-item__not__found">Resto not found. Make sure you are typing the right resto name or simply add some resto as your favorite.</div>
          </div>
            
      </div>

      <div id="resto-search-container">
          <div class="">
            <div class="resto-item__not__found">.</div>
          </div>
            
      </div>
    `
  }
}

export default FavoriteRestoSearchView
