import UrlParser from '../../routes/url-parser'
import RestoDbSource from '../../data/restodb-source'
import { createRestoDetailTemplate } from '../templates/template-creator'
import LikeButtonPresenter from '../../utils/like-button-presenter'
import FavoriteRestoIdb from '../../data/favorite-resto-idb'

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

    LikeButtonPresenter.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      favoriteRestos: FavoriteRestoIdb,
      resto: {
        id: resto.id,
        name: resto.name,
        pictureId: resto.pictureId,
        city: resto.city,
        rating: resto.rating,
        description: resto.description
      }
    })

    const reviewerName = document.querySelector('#inputName')
    const reviewerComment = document.querySelector('#inputReview')
    const submitButton = document.querySelector('#submitReview')

    submitButton.addEventListener('click', async () => {
      if (reviewerName.value === '' || reviewerComment.value === '') {
        alert('Review content can\'t be empty')
        reviewerName.value = ''
        reviewerComment.value = ''
      } else {
        const review = {
          id: resto.id,
          name: reviewerName.value,
          review: reviewerComment.value
        }

        const sendReview = await RestoDbSource.postReview(review)
        reviewerName.value = ''
        reviewerComment.value = ''
        console.log(sendReview)
        location.reload()
      }
    })
  }
}

export default RestoDetail
