import AllResto from '../views/pages/all-resto'
import RestoDetail from '../views/pages/detail'
import Like from '../views/pages/favorite'

const routes = {
  '/': AllResto, // default page
  '/all-resto': AllResto,
  '/detail/:id': RestoDetail,
  '/like': Like
}

export default routes
