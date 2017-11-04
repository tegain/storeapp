<template>
  <div class="Store-product__card">
    <div class="Store-product__share"></div>

    <img :src="product.picture.small" alt="" :width="product.picturesSizes.small" class="Store-product__picture">

    <div class="Store-product__backgroundText">
      <strong>{{ product.name | keeplast }}</strong>
    </div>

    <div class="Store-product__content">
      <div class="Store-product__heading">
        <h2 class="Store-product__name">{{ product.name | capitalize }}</h2>

        <span class="Store-product__stock" :class="{ 'inStock': isInStock, 'outOfStock': !isInStock }">
        <em v-if="isInStock">In stock</em>
        <em v-else>Out of stock</em>
      </span>

        <select class="Store-product__quantity" v-model="quantity">
          <option :value="n" v-for="n in 5">{{ n }}</option>
        </select>
      </div>

      <div class="Store-product__description">{{ product.description }}</div>
    </div>

    <add-to-cart :product="product" :quantity="quantity" :isInStock="isInStock"></add-to-cart>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        quantity: 1,
        isInStock: (this.product.stock > 0)
      }
    },

    props: ['product'],

    filters: {
      capitalize (value) {
        if (!value) return ''
        value = value.toString()
        return value.charAt(0).toUpperCase() + value.slice(1)
      },

      keeplast (value) {
        if (!value) return ''
        value = value.toString()
        value = value.split(' ')
        return value[value.length - 1].toUpperCase()
      }
    },

    methods: {
      initProductCard () {
        let $dropdown = document.querySelector('.Store-product__quantity')

        $dropdown.addEventListener('touchstart touchmove touchend', (e) => {
          e.stopPropagation()
        })
      }
    },

    mounted () {
      this.initProductCard()

      window.addEventListener('scroll', (e) => {
        console.log(e)
      })
    }
  }
</script>

<style lang="scss">
  .Store-product {

    &__card {
      padding: 0 1.5rem 1.5rem;
      height: 100%;
      position: relative;
      z-index: 2;
      background: #fff;
    }

    &__heading {
      opacity: 0;
      transform: translate(-2rem, 0);
      transition-duration: .4s;
      transition-delay: .55s;
    }

    &__content {
      position: relative;
      overflow: hidden;
    }

    &__picture {
      margin-top: -30%;
      max-width: 75%;
      position: relative;
      z-index: 1;
      opacity: 0;
      transform: translate(-2rem, 0);
      transition-duration: .4s;
      transition-delay: .45s;
    }

    &__name {
      padding-right: 5rem;
      margin: .25rem 0;
      font-size: 1.5rem;
    }

    &__backgroundText {
      opacity: .4;
      overflow: hidden;
      position: absolute;
      z-index: 0;
      top: 0;
      left: 0;
      right: 0;
      font-weight: 700;
      font-size: 8rem;
      color: #ccc;

      strong {
        display: block;
        opacity: 0;
        transform: translateX(-100%);
        transition-duration: .5s;
        transition-delay: .15s;
      }
    }

    &__stock {
      display: block;
      margin-bottom: 1rem;
      font-size: .75rem;

      em {
        &:before {
          content: "";
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-right: .25rem;
          display: inline-block;
          vertical-align: baseline;
          background: var(--col-green-light);
        }
      }

      &.outOfStock em:before {
        background: var(--col-red-light);
      }
    }

    &__quantity {
      position: absolute;
      z-index: 2;
      top: 0;
      right: 0;
      padding: .5rem .75rem;
      border-radius: 1.5rem;
      background: #fff;
      font-weight: 700;
      border-color: #ccc;
    }

    &__description {
      font-size: .9rem;
      line-height: 1.5;
      opacity: 0;
      transform: translate(-2rem, 0);
      transition-duration: .4s;
      transition-delay: .6s;
    }
  }

  .Store-home__slide.active {
    .Store-product {

      &__heading {
        transform: translate(0, 0);
        opacity: 1;
      }

      &__description {
        transform: translate(0, 0);
        opacity: 1;
      }

      &__picture {
        transform: translate(0, 0);
        opacity: 1;
      }

      &__backgroundText {
        strong {
          transform: translateX(0);
          opacity: 1;
        }
      }
    }
  }
</style>
