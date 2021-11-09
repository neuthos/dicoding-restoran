import API_ENDPOINT from '../globals/api-endpoint'

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
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(review)
    })
    return response
  }
}

export default RestoDbSource
