<template>
  <div class="Store-product__card">
    <div class="Store-product__share"></div>

    <img :src="product.picture.small" alt="" :width="product.picturesSizes.small" class="Store-product__picture">

    <div class="Store-product__content">
      <div class="Store-product__heading">
        <h2 class="Store-product__name">{{ product.name | capitalize }}</h2>


      </div>

    </div>
  </div>
</template>

<script>
  // import { mapGetters } from 'vuex'

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

    },

    computed: {
      productQuantity: {
        get () {
        },

        set (quantity) {
        }
      }
    },

    mounted () {
    }
  }
</script>

<style lang="scss" scoped>
  .Store-product {

    &__card {
      padding: .5rem;
      border-bottom: 1px solid #ddd;
      position: relative;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
    }

    &__picture {
      flex: 1 0 auto;
      width: 15%;
    }

    &__name {
      margin: 0 0 .25rem;
      font-size: 1rem;
      font-weight: 700;
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
