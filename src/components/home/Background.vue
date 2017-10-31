<template>
  <div class="Store-home__background">
    {{ productColor }}
  </div>
</template>

<script>
  export default {
    props: ['productColor']
  }
</script>

<style lang="scss">
  .Store-home__background {
    background: #ddd;
    position: fixed;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
