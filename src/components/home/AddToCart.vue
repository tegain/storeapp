<template>
  <div class="Store-addToCart">
    <span class="Store-addToCart__price">
      <!--{{ totalPrice }} €-->
      <!--<span style="font-size: .5rem; line-height: 1; display: block;">{{ sliderActiveProduct.price }}</span>-->
      {{ totalPrice }}
    </span>

    <button class="Store-addToCart__button" :disabled="!sliderActiveProduct.stock > 0" @click="addProductToCart">Add to cart</button>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    // props: ['product', 'quantity', 'isInStock'],

    data () {
      return {
        product: null,
        totalPrice: null,
        isInStock: false
      }
    },

    computed: {
      ...mapGetters([
        'sliderActiveProduct',
        'productQuantity'
      ])
    },

    watch: {
      productQuantity: function (newVal, oldVal) {
        // console.log('Prop changed: ', newVal, ' | was: ', oldVal)
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

        console.log(product.price)
        this.totalPrice = price
      },

      addProductToCart () {
        console.log(`Le produit "${this.sliderActiveProduct.name}" est bien ajouté au panier, pour un prix total de ${this.totalPrice} €.`)
      }
    },

    mounted () {
      this.updateTotalPrice()
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

    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;

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
