<template>
  <div class="Store-content Store-cart" data-template="cart">
    <div class="Store-content__inner Store-cart__inner">
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
        cart: this.$store.state.cart
      }
    }
    /* computed: {
      ...mapGetters([
        'cartInfos'
      ])
    }, */
  }
</script>

<style lang="scss">
  .Store-cart {
    padding-top: 2.75rem;
    background: #eee;
  }
</style>
