class FavoriteRestoShowPresenter {
  constructor ({ view, favoriteRestos }) {
    this._view = view
    this._favoriteRestos = favoriteRestos

    this._favoriteRestos.getAllRestos()
  }

  _displayRestos (restos) {
    this._view.showFavoriteRestos(restos)
  }
}

export default FavoriteRestoShowPresenter
