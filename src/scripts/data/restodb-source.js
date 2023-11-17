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
    try {
      const response = await fetch(API_ENDPOINT.POST_REVIEW, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(review)
      })
      console.log(response)
      alert('Review posted successfully')
      return response
    } catch {
      alert('Could not post review. Please try again later.')
    }
  }
}

export default RestoDbSource
