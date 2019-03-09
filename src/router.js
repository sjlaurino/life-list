import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import ItemDetails from './views/ItemDetails.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/itemDetails/:id',
      name: 'itemDetails',
      props: true,
      component: ItemDetails
    }
  ]
})
