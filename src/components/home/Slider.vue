<template>
  <div class="Store-home__slider" :data-color="activeSlide">
    <!-- Slider pagination -->
    <div class="Store-home__sliderNav">
      <button class="Store-home__sliderBullet" :class="{ 'active': index === activeSlide }" v-for="(product, index) in products" :key="product.index" @click="goToSlide(product.index)">
        {{ product.index }}
      </button>
    </div>

    <!-- Slides -->
    <div class="Store-home__sliderWrap">
      <div class="Store-home__slides" :style="`transform: translateX(${sliderOffset}px)`">
        <div v-for="(product, index) in products" class="Store-home__slide" :class="{ 'active': index === activeSlide }" :key="product.index">
          <product-card :product="product"></product-card>
        </div>
      </div>

      <nav>
        <button @click="goToPrevSlide">Prev</button>
        <button @click="goToNextSlide">Next</button>
      </nav>
    </div>
  </div>
</template>

<script>
  import Products from '@/data/products.json'

  export default {
    data () {
      return {
        products: Products,
        slider: '.Store-home__slides',
        slide: '.Store-home__slide',
        activeSlide: 0,
        sliderOffset: 0
      }
    },

    methods: {
      initSlider () {
        let $slider = document.querySelector(this.slider)
        let slidesLgth = this.products.length

        $slider.style.width = slidesLgth * 100 + '%'
        $slider.style.transform = 'translateX(0)'
      },

      goToSlide (slide) {
        let $slide = document.querySelector(this.slide)
        let slideWidth = $slide.getBoundingClientRect().width
        let slideActiveIndex = slide

        this.activeSlide = slide
        this.sliderOffset = -(slideWidth * slideActiveIndex)
      },

      goToPrevSlide () {
        let $slide = document.querySelector(this.slide)
        let slideWidth = $slide.getBoundingClientRect().width

        if (this.activeSlide > 0) {
          this.activeSlide -= 1
          this.sliderOffset = -(slideWidth * this.activeSlide)
        }
      },

      goToNextSlide () {
        let $slide = document.querySelector(this.slide)
        let slideWidth = $slide.getBoundingClientRect().width

        if ((this.activeSlide + 1) < this.products.length) {
          this.activeSlide += 1
          this.sliderOffset = -(slideWidth * this.activeSlide)
        }
      },

      onTouchEvents () {
        let triggerOffset = 50 // next/prev navigation triggers when user drags more than this amount
        let touchClasses = ['is-moving', 'has-moved'] // Define classes for moving events
        let $slider = document.querySelector(this.slider)
        // let $slide = document.querySelector(this.slide)
        // let slideWidth = $slide.getBoundingClientRect().width
        let startx
        let touchobj = null

        $slider.addEventListener('touchstart', (e) => {
          $slider.classList.remove(touchClasses[0], touchClasses[1])
          touchobj = e.changedTouches[0]
          startx = parseInt(touchobj.clientX)
        }, false)

        /* $slider.addEventListener('touchmove', (e) => {
          // Add 'is-moving' class to slider
          $slider.classList.add(touchClasses[0])
          touchobj = e.changedTouches[0]
          let dist = parseInt(touchobj.clientX) - startx

          // Live dragging if drag distance is below triggering offset, and below total slider width
          if ((dist > -triggerOffset && dist < -10) || (dist < triggerOffset && dist > 10)) {
            if ((this.sliderOffset + dist) < -10 && (this.sliderOffset + dist) > (-slideWidth * (this.products.length - 1))) {
              this.sliderOffset = this.sliderOffset + dist
            }
          }

          e.preventDefault()
        }, false) */

        $slider.addEventListener('touchend', (e) => {
          $slider.classList.replace(touchClasses[0], touchClasses[1])
          touchobj = e.changedTouches[0]
          let dist = parseInt(touchobj.clientX) - startx

          if (dist < -triggerOffset) {
            this.goToNextSlide()
          } else if (dist > triggerOffset) {
            this.goToPrevSlide()
          }
        }, false)
      }
    },

    mounted () {
      let hasTouchEvent = window.MSPointerEvent || window.PointerEvent || window.TouchEvent

      // Init slider
      this.initSlider()

      if (hasTouchEvent) {
        this.onTouchEvents()
      }
    }
  }
</script>
