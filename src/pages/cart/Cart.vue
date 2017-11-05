<template>
  <div class="Store-content" data-template="cart">
    Cart page content
    <div class="item" v-for="(product, key) in cart" :key="product.index">
      {{ product.name }}
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
