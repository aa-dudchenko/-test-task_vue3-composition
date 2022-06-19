import { createRouter, createWebHistory } from 'vue-router'
import CatalogPage from '../views/CatalogPage.vue'
import AboutProduct from '../views/AboutView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: CatalogPage
  },
  {
    path: '/about-pokemon/:pokemon_index',
    name: 'about',
    component: AboutProduct,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
