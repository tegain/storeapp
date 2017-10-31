<template>
  <div class="Store-product__card">
    <strong>Slide n°{{ product.index }}</strong><br>
    {{ product.name }}
  </div>
</template>

<script>
  export default {
    props: ['product']
  }
</script>
