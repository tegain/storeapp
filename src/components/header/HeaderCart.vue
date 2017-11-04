<template>
  <div class="Store-header__cart">
    <router-link :to="{ name: 'Cart' }" tag="button">
      <svg class="icon icon-shopping-cart" width="18" height="18"><use xlink:href="#icon-shopping-cart"></use></svg>
    </router-link>
  </div>
</template>

<script>
  export default {}
</script>
