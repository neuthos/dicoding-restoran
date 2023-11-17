import CONFIG from '../../globals/config'

const createRestoDetailTemplate = (resto) => `
  <h2 class=" resto__title">${resto.name}</h2>
  <picture>
    <source type="image/webp" media="(max-width: 600px)" data-srcset="${CONFIG.SMALL_IMAGE_URL}${resto.pictureId}">
    <source type="image/png" media="(max-width: 600px)" data-srcset="${CONFIG.SMALL_IMAGE_URL}${resto.pictureId}">
    <img class="resto__poster lazyload" src="resto-placeholder.jpg" data-src="${CONFIG.MEDIUM_IMAGE_URL}${resto.pictureId}" alt="${resto.name}">
  </picture>
  <div class="resto__info resto__card">
    <h3 class="detail-title">About</h3>
      <h4>
          <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pin-map-fill" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M3.1 11.2a.5.5 0 0 1 .4-.2H6a.5.5 0 0 1 0 1H3.75L1.5 15h13l-2.25-3H10a.5.5 0 0 1 0-1h2.5a.5.5 0 0 1 .4.2l3 4a.5.5 0 0 1-.4.8H.5a.5.5 0 0 1-.4-.8l3-4z"/>
                  <path fill-rule="evenodd" d="M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999z"/>
              </svg>
          </span>Location
      </h4>
      <p>${resto.address}, ${resto.city}</p>
      <h4>
          <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
              </svg>
          </span>${resto.rating} / 5.0
      </h4>

      <h4>Foods Menu</h4>
          <span id="food">
              <p>${resto.menus.foods.map((food) => food.name)}</p>
          </span>

      <h4>Drinks Menu</h4>
          <span id="drink">
              <p>${resto.menus.drinks.map((drink) => drink.name)}</p>
          </span>
  </div>

  <div class="resto__overview resto__card">
    <h3 class="detail-title">Overview</h3>
    <p overview-detail>${resto.description}</p>
  </div>

  <div class="restaurantReview resto__card">
    <h3 class="detail-title">Customer Reviews</h3>
    <div class="review-detail">
      ${resto.customerReviews.map((review) => `
          <div class="restaurantInfoList">
              <h4 class="authorReview" tabindex="0">${review.name}
              <span class="timeReview" tabindex="0" class="date-review"> - ${review.date}</span></h4>
              <p class="contentReview" tabindex="0">"${review.review}"</p>
          </div>
      `).join('')}
    </div>
  </div>

  <div class="postReview resto__card">
    <h3 class="detail-title">Post Review</h3>
      <div class="container">
        <div>
            <div class="comment">
          <p v-for="items in item" v-text="items"></p>
            </div><!--End Comment-->
            </div><!-- End row -->
        <div>
          <input id="inputName" type="text" class="input" placeholder="Your name"></input>
          <textarea id="inputReview" type="text" class="input" placeholder="Write a review" v-model="newItem" @keyup.enter="addItem()"></textarea>
          <button id="submitReview" class='primaryContained'>Add Review</button>
        </div><!--End Row -->
      </div>
  </div>
`

const createRestoItemTemplate = (resto) => `
  <a href="${`/#/detail/${resto.id}`}">
  <div class="resto-item">
    <div class="resto-item__header">
      <picture>
        <source type="image/webp" media="(max-width: 600px)" data-srcset="${CONFIG.SMALL_IMAGE_URL}${resto.pictureId}">
        <source type="image/png" media="(max-width: 600px)" data-srcset="${CONFIG.SMALL_IMAGE_URL}${resto.pictureId}">
        <img loading="lazy" src="resto-placeholder.jpg" class="resto-item__header__poster lazyload" alt="${resto.name || '-'}" data-src="${CONFIG.MEDIUM_IMAGE_URL + resto.pictureId}">
      </picture>
      <div class="resto-item__header__city">
        <p>📍<span class="resto-item__header__rating__score"> ${resto.city}</span></p>
      </div>
      <div class="resto-item__header__rating">
        <p>⭐️<span class="resto-item__header__rating__score">${resto.rating || '-'}</span></p>
      </div>
    </div>
    <div class="resto-item__content">
      <h3 class="resto__name">
      
        ${resto.name || '-'}
        
      </h3>
      <p>${resto.description || '-'}</p>
    </div>
  </div>
  </a>
  `

const createLikeRestoButtonTemplate = () => `
  <button aria-label="like this resto" id="likeButton" class="like">
     <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`

const createUnlikeRestoButtonTemplate = () => `
  <button aria-label="unlike this resto" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`

export {
  createRestoItemTemplate,
  createRestoDetailTemplate,
  createLikeRestoButtonTemplate,
  createUnlikeRestoButtonTemplate
}
