<template>
  <div class="Store-addToCart" :class="{ 'isLoaded': isLoaded }">
    <span class="Store-addToCart__price">{{ totalPrice }} €</span>

    <!-- See: https://stackoverflow.com/questions/46897776/vue-warn-error-in-render-function-typeerror-cannot-read-property-first-na -->
    <button class="Store-addToCart__button" v-if="sliderActiveProduct" :disabled="!sliderActiveProduct.stock > 0" @click="addProductToCart">Add to cart</button>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    data () {
      return {
        product: null,
        totalPrice: null,
        // isInStock: false,
        isLoaded: false
      }
    },

    computed: {
      ...mapGetters([
        'sliderActiveProduct',
        'productQuantity',
        'cartInfos'
      ])
    },

    watch: {
      productQuantity: function (newVal, oldVal) {
        this.updateTotalPrice()
      },

      sliderActiveProduct: function () {
        this.updateTotalPrice()
      }
    },

    methods: {
      updateTotalPrice () {
        let quantity = this.productQuantity
        let product = this.sliderActiveProduct
        let price = parseFloat((product.price / 100) * quantity).toFixed(2)

        this.totalPrice = price
      },

      addProductToCart () {
        if (this.sliderActiveProduct.stock > 0) {
          let product = this.sliderActiveProduct
          let quantity = this.productQuantity

          product.addedQuantity = quantity

          let productToAdd = JSON.stringify(product)

          this.$store.dispatch('addProductToCart', { product: productToAdd })
            .catch((error) => {
              console.error(error)
            })
        }
      }
    },

    mounted () {
      this.updateTotalPrice()

      setTimeout(() => {
        this.isLoaded = true
      }, 500)
    }
  }
</script>

<style lang="scss">
  .Store-addToCart {
    background: #fff;
    position: absolute;
    z-index: 3;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 1rem 1.5rem;
    border-top: 1px solid #eee;
    box-shadow: 0 0 24px rgba(#aaa, .5);
    transform: translateY(100%);
    transition: transform .4s;

    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;

    &.isLoaded {
      transform: translateY(0);
    }

    &__price {
      align-self: center;
      color: var(--col-green-medium);
      font-size: 1.25rem;
    }

    &__button {
      padding: .75rem 2.5rem;
      border: none;
      background: var(--col-green-medium);
      border-radius: 1.5rem;
      color: #fff;
      box-shadow: 0 4px 20px -5px var(--col-green-medium);
      transition: opacity .4s;

      &:hover,
      &:active {
        background: var(--col-green-light);
      }

      &[disabled],
      &[disabled]:hover,
      &[disabled]:active {
        opacity: .35;
      }
    }
  }
</style>
