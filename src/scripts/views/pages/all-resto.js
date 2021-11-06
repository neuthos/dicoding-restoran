import RestoDbSource from '../../data/restodb-source'
import { createRestoItemTemplate } from '../templates/template-creator'

const AllResto = {
  async render () {
    return `
        <div class="content">
            <h2 class="content__heading">Find Restaurant</h2>
            <div id="restos" class="restos">

            </div>
        </div>
      `
  },

  async afterRender () {
    // Fungsi ini akan dipanggil setelah render()
    const restos = await RestoDbSource.mainPage()
    const restoContainer = document.querySelector('#restos')
    console.log(restos)
    restos.forEach((movie) => {
      restoContainer.innerHTML += createRestoItemTemplate(movie)
    })
  }
}

export default AllResto
