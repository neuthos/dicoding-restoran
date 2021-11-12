import FavoriteRestoIdb from '../src/scripts/data/favorite-resto-idb'
import FavoriteRestoSearchView from '../src/scripts/views/pages/liked-restos/favorite-resto-search-view'
import FavoriteRestoShowPresenter from '../src/scripts/views/pages/liked-restos/favorite-resto-show-presenter'

describe('Showing all favorite restos', () => {
  let view

  const renderTemplate = () => {
    view = new FavoriteRestoSearchView()
    document.body.innerHTML = view.getFavoriteRestoTemplate()
  }

  beforeEach(() => {
    renderTemplate()
  })

  describe('When no restos have been liked', () => {
    it('should render the information that no restos have been liked', () => {
      const favoriteRestos = spyOnAllFunctions(FavoriteRestoIdb)
      const presenter = new FavoriteRestoShowPresenter({
        view,
        favoriteRestos
      })

      presenter._displayRestos(restos)

      expect(document.querySelectorAll('.resto-item__not__found').length).toEqual(1)
    })

    it('should ask for the favorite restos', () => {
      const favoriteRestos = spyOnAllFunctions(FavoriteRestoIdb)

      new FavoriteRestoShowPresenter({
        view,
        favoriteRestos
      })

      expect(favoriteRestos.getAllRestos).toHaveBeenCalledTimes(1)
    })
  })
})
