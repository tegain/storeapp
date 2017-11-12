// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Components from '@/components/index'

Components.forEach((component) => {
  Vue.component(component.name, component.template)
})

Vue.config.productionTip = false

/**
 * When user tries to access 'cart' view,
 * Check for cart products in store.
 * If there are none, redirects to home view.
 */
router.beforeEach((to, from, next) => {
  if (to.name === 'Cart') {
    if (store.state.cart.length === 0) {
      next('/')
    } else {
      next()
    }
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
