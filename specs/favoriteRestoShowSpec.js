import FavoriteRestoSearchView from '../src/scripts/views/pages/liked-restos/favorite-resto-search-view'
import FavoriteRestoShowPresenter from '../src/scripts/views/pages/liked-restos/favorite-resto-show-presenter'
import FavoriteRestoIdb from '../src/scripts/data/favorite-resto-idb'

describe('Showing all favorite restos', () => {
  let view

  const renderTemplate = () => {
    view = new FavoriteRestoSearchView()
    document.body.innerHTML = view.getTemplate()
  }

  beforeEach(() => {
    renderTemplate()
  })

  describe('When no restos have been liked', () => {
    it('should ask for the favorite resto', () => {
      const favoriteRestos = spyOnAllFunctions(FavoriteRestoIdb)

      new FavoriteRestoShowPresenter({
        view,
        favoriteRestos
      })

      expect(favoriteRestos.getAllRestos).toHaveBeenCalledTimes(1)
    })

    it('should show the information that no restos have been liked', (done) => {
      document.getElementById('restos').addEventListener('restos:updated', () => {
        expect(document.querySelectorAll('.resto-item__not__found').length).toEqual(3)
        done()
      })

      const favoriteRestos = spyOnAllFunctions(FavoriteRestoIdb)
      favoriteRestos.getAllRestos.and.returnValues([])

      new FavoriteRestoShowPresenter({
        view,
        favoriteRestos
      })
    })
  })

  describe('When favorite restos exist', () => {
    it('should show the restos', (done) => {
      document.getElementById('restos').addEventListener('restos:updated', () => {
        expect(document.querySelectorAll('.resto-item').length).toEqual(2)
        done()
      })

      const favoriteRestos = spyOnAllFunctions(FavoriteRestoIdb)
      favoriteRestos.getAllRestos.and.returnValues([
        {
          id: 11, name: 'A', rating: 3, description: 'Sebuah resto A'
        },

        {
          id: 22, name: 'B', rating: 4, description: 'Sebuah resto B'
        }
      ])

      new FavoriteRestoShowPresenter({
        view,
        favoriteRestos
      })
    })
  })
})
