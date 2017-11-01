<template>
  <div class="Store-addToCart">
    {{ (product.price / 10) * quantity }}
  </div>
</template>

<script>
  export default {
    props: ['product', 'quantity']
  }
</script>

<style lang="scss">
  .Store-addToCart {
    position: absolute;
    z-index: 3;
    bottom: 0;
    left: 0;
    width: 100%;
  }
</style>
