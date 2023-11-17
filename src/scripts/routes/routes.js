import AllResto from '../views/pages/all-resto'
import RestoDetail from '../views/pages/detail'

const routes = {
  '/': AllResto, // default page
  '/all-resto': AllResto,
  '/detail/:id': RestoDetail
}

export default routes
