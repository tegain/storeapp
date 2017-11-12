<template>
  <div class="Store-content Store-cart" data-template="cart">
    <div class="Store-content__inner Store-cart__inner">
      <div class="Store-cart__total">Total : {{ totalPrice }} €</div>

      <div class="Store-cart__items" v-if="cart.length > 0">
        <div class="Store-cart__item" v-for="(product, key) in cart" :key="product.index">
            <cart-product-card :product="product"></cart-product-card>
        </div>
      </div>

      <div class="Store-cart__noItems" v-else>
        <h2>Le panier est vide.</h2>

        <router-link :to="{ name: 'Home' }" tag="button">Retour à l'accueil</router-link>
      </div>

      <div class="Store-cart__checkout" :class="{ 'isLoaded': isLoaded }">
        <button :disabled="cartHasProducts">Payer la commande</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        totalPrice: 0,
        isLoaded: false
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
          // Read this:
          // - https://forum.vuejs.org/t/watch-for-update-of-deep-vuex-store-object/5318/2
          // - https://vuejs.org/v2/guide/reactivity.html#Change-Detection-Caveats
          this.calculateTotalPrice()
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
      },

      cartHasProducts () {
        return this.cartInfos.length > 0
      }
    },

    mounted () {
      this.calculateTotalPrice()

      setTimeout(() => {
        this.isLoaded = true
      }, 500)
    }
  }
</script>

<style lang="scss">
  .Store-cart {
    padding-top: 2.75rem;
    background: #eee;

    &__inner {
      height: 100%;
    }

    &__total {
      background: var(--col-green-medium);
      padding: .75rem;
      color: #fff;
      text-align: center;
      font-weight: 700;
    }

    &__items {
      height: calc(100% - 2.75rem);
      padding-bottom: 3rem;
      overflow: hidden;
      overflow-y: auto;
    }

    &__checkout {
      position: fixed;
      z-index: 3;
      bottom: 0;
      right: 0;
      width: 100%;
      background: #eee;
      padding: 1rem 1.5rem;
      border-top: 1px solid #ddd;
      box-shadow: 0 0 24px rgba(#aaa, .5);
      text-align: center;
      transform: translateY(100%);
      transition: transform .4s;

      &.isLoaded {
        transform: translateY(0);
      }

      button {
        border: none;
        padding: .75rem 2.5rem;
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

    /**
     * No items in cart
     */
    &__noItems {
      height: 100%;
      text-align: center;
      padding-top: 5rem;

      h2 {
        margin-top: 0;
        width: 100%;
      }

      button {
        border: none;
        padding: .75rem 2.5rem;
        background: var(--col-green-medium);
        border-radius: 1.5rem;
        color: #fff;
        box-shadow: 0 4px 20px -5px var(--col-green-medium);
        transition: opacity .4s;

        &:hover,
        &:active {
          background: var(--col-green-light);
        }
      }
    }
  }
</style>
