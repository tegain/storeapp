<style src="@/scss/index.scss" lang="scss"></style>

<template>
  <div id="app">
    <store-header></store-header>
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>
