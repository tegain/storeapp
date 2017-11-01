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
        let triggerOffset = 60 // next/prev navigation triggers when user drags more than this amount
        let touchClasses = ['is-moving', 'has-moved'] // Define classes for moving events
        let $slider = document.querySelector(this.slider)
        let $slide = document.querySelector(this.slide)
        let slideWidth = $slide.getBoundingClientRect().width
        let startx
        let touchobj = null

        $slider.addEventListener('touchstart', (e) => {
          $slider.classList.remove(touchClasses[0], touchClasses[1])
          touchobj = e.changedTouches[0]
          startx = parseInt(touchobj.clientX)
          e.preventDefault()
        }, false)

        $slider.addEventListener('touchmove', (e) => {
          // Add 'is-moving' class to slider
          $slider.classList.add(touchClasses[0])
          touchobj = e.changedTouches[0]
          let dist = parseInt(touchobj.clientX) - startx

          // Live dragging if drag distance is below triggering offset, and below total slider width
          if ((dist > -triggerOffset && dist < 0) || (dist < triggerOffset && dist > 0)) {
            if ((this.sliderOffset + dist) < 0 && (this.sliderOffset + dist) > (-slideWidth * (this.products.length - 1))) {
              this.sliderOffset = this.sliderOffset + dist
            }
          }

          e.preventDefault()
        }, false)

        $slider.addEventListener('touchend', (e) => {
          $slider.classList.replace(touchClasses[0], touchClasses[1])
          touchobj = e.changedTouches[0]
          let dist = parseInt(touchobj.clientX) - startx

          if (dist < -triggerOffset) {
            this.goToNextSlide()
          } else if (dist > triggerOffset) {
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
  @import '../../scss/vars';

  .Store-home {

    &__slider {
      position: relative;
      height: 100%;
      padding-top: 2.75rem;
      transition: background 2s;

      &:before {
        content: "";
        pointer-events: none;
        position: absolute;
        z-index: 0;
        top: 0;
        right: 0;
        height: 100%;
        width: 100%;
      }

      &[data-color="0"] {
        background: $col-blue-dark;

        &:before {
          @include gradientTransparent($col-blue-light, to left)
        }
      }

      &[data-color="1"] {
        background: $col-purple-dark;

        &:before {
          @include gradientTransparent($col-purple-light, to left)
        }
      }

      &[data-color="2"] {
        background: $col-pink-dark;

        &:before {
          @include gradientTransparent($col-pink-light, to left)
        }
      }

      &[data-color="3"] {
        background: $col-red-dark;

        &:before {
          @include gradientTransparent($col-red-light, to left)
        }
      }

      &[data-color="4"] {
        background: $col-orange-dark;

        &:before {
          @include gradientTransparent($col-orange-light, to left)
        }
      }
    }

    &__sliderNav {
      position: absolute;
      padding: .5rem;
      padding-top: 4rem;
      z-index: 2;
      top: 0;
      left: 0;
      width: 100%;
      text-align: center;
    }

    &__sliderBullet {
      margin: 0 .25rem;
      padding: 0;
      border: none;
      width: .5rem;
      height: .5rem;
      border-radius: 50%;
      background: #fff;
      opacity: .3;
      text-indent: -999em;
      transition: opacity .4s;

      &.active {
        opacity: 1;
      }
    }

    &__sliderWrap {
      position: relative;
      overflow: hidden;
      padding-top: 25vh;
      height: 100%;

      &:before {
        content: "";
        position: absolute;
        top: 5rem;
        left: 0;
        width: 100%;
        height: 25vh;
        transform: skewY(-13deg);
        transform-origin: 100% 0;
        background: #fff;
      }
    }

    &__slides {
      position: relative;
      background: #fff;
      transition: transform .5s;
      height: 100%;
    }

    &__slide {
      position: relative;
      float: left;
      width: 100vw;
      height: 100%;

      // Placeholder
      padding: 5rem;
      // background: #eee;
      text-align: center;
    }
  }
</style>
