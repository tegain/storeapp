<template>
  <div class="Store-product__card">
    <img :src="product.picture.small" alt="" :width="product.picturesSizes.small" class="Store-product__picture">
    <h2 class="Store-product__name">{{ product.name | capitalize }}</h2>
  </div>
</template>

<script>
  export default {
    props: ['product'],

    filters: {
      capitalize (value) {
        if (!value) return ''
        value = value.toString()
        return value.charAt(0).toUpperCase() + value.slice(1)
      }
    }
  }
</script>

<style lang="scss">
  .Store-product {

    &__card {
      padding: 0 1.5rem 1.5rem;
    }

    &__picture {
      margin-top: -30%;
      max-width: 75%;
    }
  }
</style>
