<template>
  <div class="Store-home__slider">
    <!-- Slider pagination -->
    <div class="Store-home__sliderNav">
      <button class="Store-home__sliderBullet" v-for="product in products" :key="product.index" @click="goToSlide(product.index)">
        {{ product.index }}
      </button>
    </div>

    <!-- Slides -->
    <div class="Store-home__sliderWrap">
      <div class="Store-home__slides" :style="`transform: translateX(${sliderOffset}px)`">
        <div v-for="product in products" class="Store-home__slide" :class="'Store-home__slide-' + product.index" :key="product.index">
          <strong>Slide n°{{ product.index }}</strong><br>
          {{ product.name }}
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
        let $slider = document.querySelector(this.slider)
        let startx
        let touchobj = null

        $slider.addEventListener('touchstart', (e) => {
          touchobj = e.changedTouches[0]
          startx = parseInt(touchobj.clientX)
          e.preventDefault()
        }, false)

        $slider.addEventListener('touchend', (e) => {
          touchobj = e.changedTouches[0] // reference first touch point for this event
          let dist = parseInt(touchobj.clientX) - startx // calculate dist traveled by touch point

          if (dist < -60) {
            this.goToNextSlide()
          } else if (dist > 60) {
            this.goToPrevSlide()
          }
          e.preventDefault()
        }, false)
      }
    },

    mounted () {
      let hasTouchEvent = window.MSPointerEvent || window.PointerEvent || window.TouchEvent

      this.initSlider()

      if (hasTouchEvent) {
        this.onTouchEvents()
      }
    }
  }
</script>

<style lang="scss">
  .Store-home {

    &__sliderWrap {
      overflow: hidden;
    }

    &__slides {
      position: relative;
      transition: transform .5s;
    }

    &__slide {
      position: relative;
      float: left;
      width: 100vw;

      // Placeholder
      padding: 5rem;
      background: #eee;
      border: 1px solid #ddd;
      text-align: center;
    }
  }
</style>
