<template>
  <div class="Store-addToCart">
    <span class="Store-addToCart__price">
      {{ totalPrice }} €
    </span>

    <button class="Store-addToCart__button" :disabled="!isInStock">Add to cart</button>
  </div>
</template>

<script>
  export default {
    props: ['product', 'quantity', 'isInStock'],

    data () {
      return {
        totalPrice: this.product.price
      }
    },

    watch: {
      quantity: function (newVal, oldVal) {
        // console.log('Prop changed: ', newVal, ' | was: ', oldVal)
        this.updateTotalPrice()
      }
    },

    methods: {
      updateTotalPrice () {
        let quantity = this.quantity
        let product = this.product
        let price = parseFloat((product.price / 100) * quantity).toFixed(2)

        /**
         * Parse price to separate decimals
         * @type {string}
         */
        // let priceInt = price.split('.')[0]
        // let priceDecimals = price.split('.')[1]
        // priceDecimals = `<sup>${priceDecimals}</sup>`
        // this.totalPrice = `${priceInt}${priceDecimals}`

        this.totalPrice = price
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
