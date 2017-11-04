<template>
  <div class="Store-navigation">
    <nav>
      <ul>
        <li><a href="#">Menu item 1</a></li>
        <li><a href="#">Menu item 2</a></li>
        <li><a href="#">Menu item 3</a></li>
        <li><a href="#">Menu item 4</a></li>
        <li><a href="#">Menu item 5</a></li>
      </ul>
    </nav>
  </div>
</template>

<script>
  export default {}
</script>

<style lang="scss">
  .Store-navigation {
    background: #f0f0f0;
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    justify-content: center;

    nav {
      padding: 1.5rem;
    }

    ul {
      margin: 0;
      padding: 0;
    }

    li {
      list-style-type: none;
    }

    a {
      display: block;
      padding: .75rem;
      padding-right: 25vw;
      padding-left: 3rem;
      line-height: 1.3;
      font-size: 1.25em;
      text-decoration: none;
      color: inherit;
    }
  }
</style>
