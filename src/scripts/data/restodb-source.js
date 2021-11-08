import API_ENDPOINT from '../globals/api-endpoint'
import CONFIG from '../globals/config'

class RestoDbSource {
  static async mainPage () {
    const response = await fetch(API_ENDPOINT.RESTO_LIST)
    const responseJson = await response.json()
    return responseJson.restaurants
  }

  static async detailResto (id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id))
    const data = await response.json()
    return data.restaurant
  }

  static async postReview (review) {
    const response = await fetch(API_ENDPOINT.POST_REVIEW, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded' || 'application/json',
        'X-Auth-Token': CONFIG.CONFIG_KEY
      },
      body: JSON.stringify(review)
    })
    return response
  }
}

export default RestoDbSource
