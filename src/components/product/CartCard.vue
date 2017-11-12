<template>
  <div class="Store-product__card" :data-id="product._id">
    <div class="Store-product__inner">
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
    </div>

    <div class="Store-product__delete">
      <button @click.prevent="deleteProduct">
        <svg class="Store-product__deleteIcon">
          <use xlink:href="#icon-delete"></use>
        </svg>
      </button>
    </div>
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
        if (this.product.addedQuantity > 1) {
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
      },

      onTouchEvents () {
        let triggerOffset = 80
        let touchClasses = ['is-moving', 'has-moved'] // Define classes for moving events
        let $card = document.querySelector(`[data-id="${this.product._id}"]`)
        let $cardContent = $card.querySelector('.Store-product__inner')
        // let $slide = document.querySelector(this.slide)
        // let slideWidth = $slide.getBoundingClientRect().width
        let startx
        let touchobj = null

        $cardContent.addEventListener('touchstart', (e) => {
          $cardContent.classList.remove(touchClasses[0], touchClasses[1])
          touchobj = e.changedTouches[0]
          startx = parseInt(touchobj.clientX)
        }, false)

        $cardContent.addEventListener('touchend', (e) => {
          $cardContent.classList.replace(touchClasses[0], touchClasses[1])
          touchobj = e.changedTouches[0]
          let dist = parseInt(touchobj.clientX) - startx

          if (dist < -triggerOffset) {
            $cardContent.style.transform = `translateX(-${triggerOffset}px)`
          } else {
            $cardContent.style.transform = 'translateX(0)'
          }
        }, false)
      }
    },

    mounted () {
      let hasTouchEvent = window.MSPointerEvent || window.PointerEvent || window.TouchEvent

      this.price = parseFloat(this.product.price / 100).toFixed(2)

      if (hasTouchEvent) {
        this.onTouchEvents()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .Store-product {

    &__card {
      position: relative;
    }

    &__delete {
      position: absolute;
      z-index: 0;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: var(--col-red-light);
      color: #fff;

      button {
        background: none;
        border: none;
        position: absolute;
        right: 1.2rem;
        padding: .5rem;
        top: 50%;
        transform: translateY(-50%);
        transition: background .3s;

        &:hover {
          background: rgba(#fff, .1);
        }
      }

      &Icon {
        fill: #fff;
        width: 1.5rem;
        height: 1.5rem;
      }
    }

    &__inner {
      padding: 1rem .5rem;
      border-bottom: 1px solid #ddd;
      background: #eee;
      position: relative;
      z-index: 1;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      transition: background .4s, transform .3s;

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
