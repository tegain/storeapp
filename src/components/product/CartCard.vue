<template>
  <div class="Store-product__card" :data-id="product._id">
    <div class="Store-product__inner" :style="`transform: translateX(${cardOffset}px)`">
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
      <button @click.prevent="openProductPopin">
        <svg class="Store-product__deleteIcon">
          <use xlink:href="#icon-delete"></use>
        </svg>
      </button>
    </div>

    <div class="Store-product__popin" v-if="deletePopin" @click.stop.self="closeProductPopin">
      <div class="Store-product__popinContent">
        <p>
          Supprimer le produit <br><strong>{{ product.name }}</strong> ?
        </p>
        <p>
          <button class="Store-product__cancelBtn" @click.prevent="closeProductPopin">Annuler</button>
          <button class="Store-product__deleteBtn" @click="deleteProduct">Supprimer</button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        quantity: 1,
        price: '',
        cardOffset: 0,
        deletePopin: false
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

      openProductPopin () {
        this.deletePopin = true
      },

      closeProductPopin () {
        this.deletePopin = false
        this.cardOffset = 0
      },

      deleteProduct () {
        let productToRemove = JSON.stringify(this.product)

        this.$store.dispatch('removeProductFromCart', { product: productToRemove }).then((success) => {
          this.popinMessage = success
          this.closeProductPopin()
        })
      },

      onTouchEvents () {
        let triggerOffset = 80
        let touchClasses = ['is-moving', 'has-moved'] // Define classes for moving events
        let $card = document.querySelector(`[data-id="${this.product._id}"]`)
        let $cardContent = $card.querySelector('.Store-product__inner')
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
            this.cardOffset = -triggerOffset
          } else {
            this.cardOffset = 0
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

    &__inner {
      padding: 1rem .5rem;
      border-bottom: 1px solid #ddd;
      background: #eee;
      position: relative;
      z-index: 1;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      border-right: 3px solid #eee;
      transition: background .4s, transform .3s, border .4s;

      &:hover {
        background: #fff;
        border-right-color: var(--col-red-light);
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

    /**
     * Delete product
     */
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

    &__popin {
      position: fixed;
      z-index: 5;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(#000, .1);


      &Content {
        position: absolute;
        z-index: 2;
        top: 50%;
        left: 50%;
        width: 80%;
        border-radius: 3px;
        transition: opacity .25s;
        transform: translate(-50%, -50%);
        background: #fff;
        padding: 1.5rem;
        text-align: center;
        box-shadow: 0 1rem 4rem rgba(#666, .25);
      }

      button {
        border: none;
        text-transform: uppercase;
        font-weight: 700;
        display: inline-block;
        margin: 1.5rem .75rem 0;
        padding: .5rem;
        border-radius: 3px;
        transition: background .3s;
        font-size: .75rem;
      }
    }

    &__deleteBtn {
      background: var(--col-red-light);
      color: #fff;

      &:hover {
        background: var(--col-red-dark);
      }
    }

    &__cancelBtn {
      background: none;
      color: #999;

      &:hover {
        background: #efefef;
      }
    }
  }
</style>
