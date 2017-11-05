<template>
  <div class="Store-header__cart">
    <router-link :to="{ name: 'Cart' }" tag="button">
      <span class="Store-header__nbItems" v-if="cartInfos" v-show="cartItems > 0">{{ cartItems }}</span>
      <svg class="icon icon-shopping-cart" width="18" height="18"><use xlink:href="#icon-shopping-cart"></use></svg>
    </router-link>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {

    data () {
      return {
        cartItems: null
      }
    },

    computed: {
      ...mapGetters([
        'cartInfos'
      ])
    },

    watch: {
      cartInfos: function () {
        this.updateCartIcon()
      }
    },

    methods: {
      updateCartIcon () {
        let products = this.cartInfos
        let cartItems = 0

        for (let i = 0; i < products.length; ++i) {
          cartItems++
        }

        this.cartItems = cartItems
      }
    }
  }
</script>

<style lang="scss">
  .Store-header {

    &__nbItems {
      position: absolute;
      z-index: 2;
      bottom: .25rem;
      left: .25rem;
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      background: var(--col-green-medium);

      font-size: .6rem;
      font-weight: 700;
      color: #fff;
      text-align: center;
      line-height: 1rem;
    }
  }
</style>
