<template>
  <div class="Store-product__card" :data-id="product._id">

    <div class="Store-product__picture">
      <img :src="product.picture.small" alt="" :width="product.picturesSizes.small" class="">
    </div>

    <div class="Store-product__content">
      <div class="Store-product__heading">
        <h2 class="Store-product__name">{{ product.name | capitalize }}</h2>
        <strong class="Store-product__price">{{ price }} €</strong>
      </div>
    </div>

    <div class="Store-product__quantity">
      <button class="Store-product__quantityRemove" @click.prevent="quantityRemove()">-</button>
      <span class="Store-product__quantityLabel">{{ product.addedQuantity }}</span>
      <button class="Store-product__quantityAdd" @click.prevent="quantityAdd()">+</button>
    </div>
    <button @click.prevent="deleteProduct">Delete</button>
  </div>
</template>

<script>
  // import { mapGetters } from 'vuex'

  export default {
    data () {
      return {
        quantity: 1,
        price: ''
      }
    },

    props: ['product'],

    filters: {
      capitalize (value) {
        if (!value) return ''
        value = value.toString()
        return value.charAt(0).toUpperCase() + value.slice(1)
      }
    },

    methods: {
      quantityAdd () {
        if (this.product.addedQuantity < 5) {
          this.product.addedQuantity++
          this.$store.dispatch('addProductToCart', { product: JSON.stringify(this.product) })
        }
      },

      quantityRemove () {
        if (this.product.addedQuantity > 0) {
          this.product.addedQuantity--
          this.$store.dispatch('addProductToCart', { product: JSON.stringify(this.product) })
        }
      },

      deleteProduct () {
        let productToRemove = JSON.stringify(this.product)

        /**
         * TODO :
         * - ADD TOUCH SLIDING EVENT TO TRIGGER DELETE
         * - ADD CONFIRMATION WARNING BEFORE REMOVING
         */

        this.$store.dispatch('removeProductFromCart', { product: productToRemove }).then((success) => {
          console.log(success)
        })
      }
    },

    mounted () {
      this.price = parseFloat(this.product.price / 100).toFixed(2)
    }
  }
</script>

<style lang="scss" scoped>
  .Store-product {

    &__card {
      padding: .5rem;
      border-bottom: 1px solid #ddd;
      background: #eee;
      position: relative;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      transition: background .4s;

      &:hover {
        background: #fff;
      }
    }

    &__picture {
      flex: 0 0 auto;
      width: 15%;

      img {
        max-width: 100%;
      }
    }

    &__name {
      margin: 0 0 .25rem;
      font-size: 1rem;
      font-weight: 700;
    }

    &__content {
      flex: 1 0 45%;
      padding: 0 1rem;
    }

    &__quantity {
      flex: 1 0 40%;
      align-self: center;
      padding: .5rem .75rem;
      font-weight: 700;
      text-align: center;

      button {
        padding: 0 .25rem;
        font-size: 1.25rem;
      }

      span {
        padding: .25rem .75rem;
      }
    }

    &__price {
      color: var(--col-green-medium);
    }
  }
</style>
