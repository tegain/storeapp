<template>
  <div class="Store-product__card">
    <div class="Store-product__share"></div>

    <img :src="product.picture.small" alt="" :width="product.picturesSizes.small" class="Store-product__picture">
    <div class="Store-product__content">
      <h2 class="Store-product__name">{{ product.name | capitalize }}</h2>

      <select class="Store-product__quantity" v-model="quantity">
        <option :value="n" v-for="n in 10">{{ n }}</option>
      </select>

      <div class="Store-product__description">{{ product.description }}</div>
    </div>

    <add-to-cart :product="product" :quantity="quantity"></add-to-cart>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        quantity: 1
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
      initProductCard () {
        let $dropdown = document.querySelector('.Store-product__quantity')

        $dropdown.addEventListener('touchstart touchmove touchend', (e) => {
          e.stopPropagation()
        })
      }
    },

    mounted () {
      this.initProductCard()
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
    }

    &__content {
      position: relative;
    }

    &__picture {
      margin-top: -30%;
      max-width: 75%;
    }

    &__name {
      padding-right: 5rem;
      font-size: 1.25rem;
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
  }
</style>
