import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sliderActiveProduct: null,
    sliderActiveProductQuantity: 1,
    cart: []
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
    },

    addProductToCart (context, data) {
      let productToAdd = JSON.parse(data.product)

      return new Promise((resolve, reject) => {
        if (productToAdd.addedQuantity > 0) {
          resolve(`Le produit ${productToAdd.name} a bien été ajouté au panier`)
          context.commit('updateCartDatas', productToAdd)
        } else {
          reject(new Error(`Vous devez choisir une quantité minimum de 1`))
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
    },

    updateCartDatas (state, product) {
      let cart = state.cart
      let alreadyExists = false

      // If added product already exists in state.cart, only update quantity property
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].index === product.index) {
          alreadyExists = true
          state.cart[i].addedQuantity = product.addedQuantity
          break
        }
      }

      // Else, just push the product to array
      if (!alreadyExists) {
        state.cart.push(product)
      }
    }
  },

  getters: {
    sliderActiveProduct: (state) => state.sliderActiveProduct,
    productQuantity: (state) => state.sliderActiveProductQuantity,
    cartInfos: (state) => state.cart
  }
})
