import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sliderActiveProduct: null,
    sliderActiveProductQuantity: 1,
    cart: null
  },

  actions: {
    getSliderActiveProduct (context, terms) {
      let productDatas = JSON.stringify(terms.activeProduct)

      return new Promise((resolve, reject) => {
        if (productDatas.length > 0) {
          resolve(productDatas)
          context.commit('setSliderActiveProduct', productDatas)
        } else {
          reject(new Error('Products informations are not available.'))
        }
      })
    },

    updateProductQuantity (context, terms) {
      let productQuantity = parseInt(terms.quantity)

      return new Promise((resolve, reject) => {
        if (productQuantity) {
          resolve(productQuantity)
          context.commit('updateProductQuantity', productQuantity)
        } else {
          reject(new Error(productQuantity))
        }
      })
    }
  },

  mutations: {
    setSliderActiveProduct (state, product) {
      state.sliderActiveProduct = JSON.parse(product)
    },

    updateProductQuantity (state, quantity) {
      state.sliderActiveProductQuantity = quantity
    }
  },

  getters: {
    sliderActiveProduct: (state) => state.sliderActiveProduct,
    productQuantity: (state) => state.sliderActiveProductQuantity
  }
})
