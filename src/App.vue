<style src="@/scss/index.scss" lang="scss"></style>

<template>
  <div id="app" class="Store-app">
    <div id="store-wrapper" class="Store-wrapper">
      <store-header></store-header>

      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
  .Store-app {
    height: 100%;
  }
</style>
