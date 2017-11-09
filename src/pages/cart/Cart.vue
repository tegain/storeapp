<template>
  <div class="Store-content Store-cart" data-template="cart">
    <div class="Store-content__inner Store-cart__inner">
      <div class="Store-cart__total">Total : {{ totalPrice }} €</div>

      <div class="Store-cart__item" v-for="(product, key) in cart" :key="product.index">
        <cart-product-card :product="product"></cart-product-card>
      </div>
    </div>
  </div>
</template>

<script>
  // import { mapGetters } from 'vuex'

  export default {
    data () {
      return {
        totalPrice: 0
      }
    },

    beforeCreate () {
      document.body.className = 'Store-page__cart'
    },

    computed: {
      cart () {
        return this.$store.getters.cartInfos
      }
    },

    watch: {
      cart: {
        handler: function (newVal, oldVal) {
          // TODO
          // Read this:
          // - https://forum.vuejs.org/t/watch-for-update-of-deep-vuex-store-object/5318/2
          // - https://vuejs.org/v2/guide/reactivity.html#Change-Detection-Caveats
          console.log('toto')
        },
        deep: true
      }
    },

    methods: {
      calculateTotalPrice () {
        let cart = this.cart
        let totalPrice = 0

        cart.forEach((product) => {
          let productPrice = product.price
          let productQuantity = product.addedQuantity

          totalPrice += productPrice * productQuantity
        })

        this.totalPrice = totalPrice / 100
      }
    },

    mounted () {
      this.calculateTotalPrice()
    }
  }
</script>

<style lang="scss">
  .Store-cart {
    padding-top: 2.75rem;
    background: #eee;

    &__total {
      background: var(--col-green-medium);
      padding: .75rem;
      color: #fff;
      text-align: center;
      font-weight: 700;
    }
  }
</style>
