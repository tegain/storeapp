<template>
  <div class="Store-product__card">
    <div class="Store-product__share"></div>

    <img :src="product.picture.small" alt="" :width="product.picturesSizes.small" class="Store-product__picture">
    <div class="Store-product__content">
      <h2 class="Store-product__name">{{ product.name | capitalize }}</h2>
      <span class="Store-product__stock" :class="{ 'inStock': isInStock, 'outOfStock': !isInStock }">
        <em v-if="isInStock">In stock</em>
        <em v-else>Out of stock</em>
      </span>

      <select class="Store-product__quantity" v-model="quantity">
        <option :value="n" v-for="n in 5">{{ n }}</option>
      </select>

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
      }
    },

    methods: {
      initProductCard () {
        let $dropdown = document.querySelector('.Store-product__quantity')

        $dropdown.addEventListener('touchstart touchmove touchend', (e) => {
          e.stopPropagation()
        })
      },

      updateStockMsg () {
        this.stockMsg = (this.product.stock > 0) ? 'In stock' : 'Out of stock'
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
      margin-bottom: .25rem;
      font-size: 1.5rem;
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
    }
  }
</style>
