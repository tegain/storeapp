import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/Home'
// import Product from '@/pages/product/Product'
import Cart from '@/pages/cart/Cart'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },

    /* {
      path: '/product/:id',
      name: 'Product',
      component: Product
    }, */

    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    }
  ]
})
