import FavoriteRestoSearchPresenter from '../src/scripts/views/pages/liked-restos/favorite-resto-search-presenter'
import FavoriteRestoIdb from '../src/scripts/data/favorite-resto-idb'

describe('Searching restos', () => {
  let presenter
  let favoriteRestos

  const searchRestos = (query) => {
    const queryElement = document.getElementById('query')
    queryElement.value = query
    queryElement.dispatchEvent(new Event('change'))
  }

  const setRestoSearchContainer = () => {
    document.body.innerHTML = `
    <div id="resto-search-container">
        <input id="query" type="text">
        <div class="resto-result-container">
            <ul class="restos">
            </ul>
        </div>
    </div>
    `
  }

  const constructPresenter = () => {
    favoriteRestos = spyOnAllFunctions(FavoriteRestoIdb)
    presenter = new FavoriteRestoSearchPresenter({
      favoriteRestos
    })
  }

  beforeEach(() => {
    setRestoSearchContainer()
    constructPresenter()
  })

  describe('When query is not empty', () => {
    it('should be able to capture the query typed by the user', () => {
      searchRestos('resto a')
      expect(presenter.latestQuery).toEqual('resto a')
    })

    it('should ask the model to search for liked restos', () => {
      searchRestos('resto a')
      expect(favoriteRestos.searchRestos)
        .toHaveBeenCalledWith('resto a')
    })

    it('should show the found restos', () => {
      presenter._showFoundRestos([{ id: 1 }])
      expect(document.querySelectorAll('.resto').length).toEqual(1)

      presenter._showFoundRestos([{ id: 1, name: 'Satu' }, { id: 2, name: 'Dua' }])
      expect(document.querySelectorAll('.resto').length).toEqual(2)
    })

    it('should show the name of the found restos', () => {
      presenter._showFoundRestos([{ id: 1, name: 'Satu' }])
      expect(document.querySelectorAll('.resto__name').item(0).textContent)
        .toEqual('Satu')

      presenter._showFoundRestos(
        [{ id: 1, name: 'Satu' }, { id: 2, name: 'Dua' }]
      )

      const restoNames = document.querySelectorAll('.resto__name')
      expect(restoNames.item(0).textContent).toEqual('Satu')
      expect(restoNames.item(1).textContent).toEqual('Dua')
    })

    it('should show - for found resto without name', () => {
      presenter._showFoundRestos([{ id: 1 }])

      expect(document.querySelectorAll('.resto__name').item(0).textContent)
        .toEqual('-')
    })

    it('should show the restos found by Favorite Restos', (done) => {
      document.getElementById('resto-search-container')
        .addEventListener('restos:searched:updated', () => {
          expect(document.querySelectorAll('.resto').length).toEqual(3)
          done()
        })

      favoriteRestos.searchRestos.withArgs('resto a').and.returnValues([
        { id: 111, name: 'resto abc' },
        { id: 222, name: 'ada juga resto abcde' },
        { id: 333, name: 'ini juga boleh resto a' }
      ])

      searchRestos('resto a')
    })

    it('should show the name of the restos found by Favorite Restos', (done) => {
      document.getElementById('resto-search-container').addEventListener('restos:searched:updated', () => {
        const restoTitles = document.querySelectorAll('.resto__name')
        expect(restoTitles.item(0).textContent).toEqual('resto abc')
        expect(restoTitles.item(1).textContent).toEqual('ada juga resto abcde')
        expect(restoTitles.item(2).textContent).toEqual('ini juga boleh resto a')

        done()
      })

      favoriteRestos.searchRestos.withArgs('resto a').and.returnValues([
        { id: 111, name: 'resto abc' },
        { id: 222, name: 'ada juga resto abcde' },
        { id: 333, name: 'ini juga boleh resto a' }
      ])

      searchRestos('resto a')
    })
  })

  describe('When query is empty', () => {
    it('should capture the query as empty', () => {
      searchRestos(' ')
      expect(presenter.latestQuery.length).toEqual(0)

      searchRestos('    ')
      expect(presenter.latestQuery.length).toEqual(0)

      searchRestos('')
      expect(presenter.latestQuery.length).toEqual(0)

      searchRestos('\t')
      expect(presenter.latestQuery.length).toEqual(0)
    })

    it('should show all favorite restos', () => {
      searchRestos('    ')

      expect(favoriteRestos.getAllRestos)
        .toHaveBeenCalled()
    })
  })

  describe('When no favorite restos could be found', () => {
    it('should show the empty message', (done) => {
      document.getElementById('resto-search-container')
        .addEventListener('restos:searched:updated', () => {
          expect(document.querySelectorAll('.restos__not__found').length)
            .toEqual(1)
          done()
        })

      favoriteRestos.searchRestos.withArgs('resto a').and.returnValues([])

      searchRestos('resto a')
    })

    it('should not show any resto', (done) => {
      document.getElementById('resto-search-container').addEventListener('restos:searched:updated', () => {
        expect(document.querySelectorAll('.resto').length).toEqual(0)
        done()
      })

      favoriteRestos.searchRestos.withArgs('resto a').and.returnValues([])

      searchRestos('resto a')
    })
  })
})
