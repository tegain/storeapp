<template>
  <div class="Store-header__navBtn">
    <button @click="toggleAppNavigation" data-parent="#app">
      <span></span>
    </button>
  </div>
</template>

<script>
  export default {
    methods: {
      toggleAppNavigation (e) {
        let $btn = e.target
        let $app = document.querySelector($btn.getAttribute('data-parent'))

        $app.classList.toggle('hasNavigation')
        $btn.classList.toggle('active')
      }
    }
  }
</script>
