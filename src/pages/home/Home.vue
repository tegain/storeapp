<template>
  <div class="Store-content Store-home" data-template="home">
    <div class="Store-content__inner Store-home__inner">
      <home-slider></home-slider>

      <add-to-cart></add-to-cart>
    </div>
  </div>
</template>

<script>
  export default {
    beforeCreate () {
      document.body.className = 'Store-page__home'
    }
  }
</script>

<style lang="scss">
  .Store-home__inner {
    background: #fff;
    height: 100%;
  }
</style>
