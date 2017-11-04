<style src="@/scss/index.scss" lang="scss"></style>

<template>
  <div id="app" class="Store-app">
    <store-nav></store-nav>

    <div id="store-wrapper" class="Store-wrapper">
      <div class="Store-wrapper__overlay"></div>

      <store-header></store-header>

      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',

  mounted () {
    document.querySelector('#store-wrapper').style.height = window.innerHeight + 'px'
  }
}
</script>

<style lang="scss">
  .Store-app {
    height: 100%;
  }
</style>
