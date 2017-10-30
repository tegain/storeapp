<template>
  <header id="store-header" class="Store-header">
    <header-nav-btn></header-nav-btn>

    <router-link :to="{ name: 'Home' }" tag="h1">StoreApp</router-link>

    <header-cart></header-cart>
  </header>
</template>
