import UrlParser from '../../routes/url-parser'
import RestoDbSource from '../../data/restodb-source'
import { createRestoDetailTemplate } from '../templates/template-creator'
import LikeButtonInitiator from '../../utils/like-button-initiator'

const RestoDetail = {
  async render () {
    return `
        <div id="resto" class="resto"></div>
        <div id="likeButtonContainer"></div>
      `
  },

  async afterRender () {
    // Fungsi ini akan dipanggil setelah render()
    const url = UrlParser.parseActiveUrlWithoutCombiner()
    const resto = await RestoDbSource.detailResto(url.id)
    const restoContainer = document.querySelector('#resto')
    restoContainer.innerHTML = createRestoDetailTemplate(resto)

    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      resto: {
        id: resto.id,
        name: resto.name,
        pictureId: resto.pictureId,
        city: resto.city,
        rating: resto.rating,
        description: resto.description
      }
    })
  }
}

export default RestoDetail
