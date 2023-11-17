import RestoDbSource from '../../data/restodb-source'
import { createRestoItemTemplate } from '../templates/template-creator'

const AllResto = {
  async render () {
    return `
        <hero-element></hero-element>
        <div class="content">
            <h2 class="content__heading">Find Restaurant</h2>
            <div id="restos" class="restos">

            </div>
        </div>
      `
  },

  async afterRender () {
    const restos = await RestoDbSource.mainPage()
    const restoContainer = document.querySelector('#restos')
    restos.forEach((movie) => {
      restoContainer.innerHTML += createRestoItemTemplate(movie)
    })
  }
}

export default AllResto
