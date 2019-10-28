<template>
  <div class="slider">
    <div class="slider__content">
      <div class="slider__header">
        <transition name="h-heading-anim" :duration="360">
          <h3
            :key="currentSlide"
            class="t-heading t-heading--inverted slider__heading"
          >{{items[currentSlide].name}}</h3>
        </transition>
        <span class="slider__page-count">{{currentSlide + 1}} / {{items.length}}</span>
      </div>
      <div
        class="slider__list-outer"
        ref="sliderListOuter"
        @mousedown="onPointerDown"
        @mouseup="onPointerUp"
        @mousemove="onDrag"
        @mouseleave="onPointerUp"
        @touchstart="onPointerDown"
        @touchmove="onDrag"
        @touchend="onPointerUp"
      >
        <transition-group
          tag="ul"
          name="h-slider-composition-anim"
          :duration="360"
          class="slider__list"
          :style="sliderListStyle"
          ref="sliderList"
        >
          <li :key="getPrevActiveIdx()" class="slider__item slider__item--prev-active">
            <img :src="items[getPrevActiveIdx()].img" alt="project screenshot" />
          </li>
          <li
            :style="activeSlideStyle"
            :key="currentSlide"
            class="slider__item slider__item--active"
          >
            <img :src="items[currentSlide].img" alt="project screenshot" />
          </li>
          <li :key="getBackIdx()" class="slider__item slider__item--back">
            <img :src="items[getBackIdx()].img" alt="project screenshot" />
            <ol class="slider__item-links">
              <li v-if="items[currentSlide].webpage" class="slider__item-link">
                <a :href="items[currentSlide].webpage" class="slider__link">
                  <span class="slider__icon">
                    <svg width="24" height="24" viewBox="0 0 24 24">
                      <path d="M0 0h24v24H0z" fill="none" />
                      <path
                        d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"
                      />
                    </svg>
                  </span>
                </a>
              </li>
              <li class="slider__item-link">
                <a :href="items[currentSlide].url" class="slider__link">
                  <span class="slider__icon">
                    <svg viewBox="0 0 128 128">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M64 5.103c-33.347 0-60.388 27.035-60.388 60.388 0 26.682 17.303 49.317 41.297 57.303 3.017.56 4.125-1.31 4.125-2.905 0-1.44-.056-6.197-.082-11.243-16.8 3.653-20.345-7.125-20.345-7.125-2.747-6.98-6.705-8.836-6.705-8.836-5.48-3.748.413-3.67.413-3.67 6.063.425 9.257 6.223 9.257 6.223 5.386 9.23 14.127 6.562 17.573 5.02.542-3.903 2.107-6.568 3.834-8.076-13.413-1.525-27.514-6.704-27.514-29.843 0-6.593 2.36-11.98 6.223-16.21-.628-1.52-2.695-7.662.584-15.98 0 0 5.07-1.623 16.61 6.19C53.7 35 58.867 34.327 64 34.304c5.13.023 10.3.694 15.127 2.033 11.526-7.813 16.59-6.19 16.59-6.19 3.287 8.317 1.22 14.46.593 15.98 3.872 4.23 6.215 9.617 6.215 16.21 0 23.194-14.127 28.3-27.574 29.796 2.167 1.874 4.097 5.55 4.097 11.183 0 8.08-.07 14.583-.07 16.572 0 1.607 1.088 3.49 4.148 2.897 23.98-7.994 41.263-30.622 41.263-57.294C124.388 32.14 97.35 5.104 64 5.104z"
                      />
                      <path
                        d="M26.484 91.806c-.133.3-.605.39-1.035.185-.44-.196-.685-.605-.543-.906.13-.31.603-.395 1.04-.188.44.197.69.61.537.91zm-.743-.55M28.93 94.535c-.287.267-.85.143-1.232-.28-.396-.42-.47-.983-.177-1.254.298-.266.844-.14 1.24.28.394.426.472.984.17 1.255zm-.575-.618M31.312 98.012c-.37.258-.976.017-1.35-.52-.37-.538-.37-1.183.01-1.44.373-.258.97-.025 1.35.507.368.545.368 1.19-.01 1.452zm0 0M34.573 101.373c-.33.365-1.036.267-1.552-.23-.527-.487-.674-1.18-.343-1.544.336-.366 1.045-.264 1.564.23.527.486.686 1.18.333 1.543zm0 0M39.073 103.324c-.147.473-.825.688-1.51.486-.683-.207-1.13-.76-.99-1.238.14-.477.823-.7 1.512-.485.683.206 1.13.756.988 1.237zm0 0M44.016 103.685c.017.498-.563.91-1.28.92-.723.017-1.308-.387-1.315-.877 0-.503.568-.91 1.29-.924.717-.013 1.306.387 1.306.88zm0 0M48.614 102.903c.086.485-.413.984-1.126 1.117-.7.13-1.35-.172-1.44-.653-.086-.498.422-.997 1.122-1.126.714-.123 1.354.17 1.444.663zm0 0"
                      />
                    </svg>
                  </span>
                </a>
              </li>
            </ol>
          </li>
          <li :key="getNextBackIdx()" class="slider__item slider__item--next-back">
            <img :src="items[getNextBackIdx()].img" alt="project screenshot" />
          </li>
        </transition-group>
      </div>
      <div class="slider__controls">
        <button @click="prevSlide" class="slider__button">
          <span class="slider__icon">
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path fill="none" d="M0 0h24v24H0V0z" />
              <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" />
            </svg>
          </span>
        </button>
        <button @click="nextSlide" class="slider__button">
          <span class="slider__icon">
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path fill="none" d="M0 0h24v24H0V0z" />
              <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" />
            </svg>
          </span>
        </button>
      </div>
    </div>
    <article class="slider__description">
      <p class="t-paragraph">
        <span class="slider__description-heading">Objectives:</span>
        {{items[currentSlide].description}}
      </p>
      <p class="t-paragraph">
        <span class="slider__description-heading">Tech highlights:</span>
        {{items[currentSlide].tech}}
      </p>
    </article>
  </div>
</template>
 
<script>
import throttle from "lodash.throttle";

export default {
  props: {
    items: { type: Array, required: true }
  },
  data: () => ({
    currentSlide: 0,
    isPointerDown: false,
    dragStartPosY: undefined,
    currDragYPos: undefined
  }),
  computed: {
    sliderListStyle() {
      return {
        cursor: this.isPointerDown ? "grabbing" : "grab"
      };
    },
    activeSlideStyle() {
      return {
        // transition: this.isPointerDown ? "none" : undefined,
        transform:
          this.currDragYPos !== undefined
            ? `translateX(-3rem) translate3d(0, 0, 0) translateY(${this.currDragYPos}px)`
            : undefined
      };
    }
  },
  methods: {
    isOverLen(idx) {
      return idx > this.items.length - 1;
    },
    getPrevActiveIdx() {
      return this.getPrevSlideIdx();
    },
    getBackIdx() {
      return this.getNextSlideIdx();
    },
    getNextBackIdx() {
      const backPos = this.getBackIdx();
      return this.isOverLen(backPos + 1) ? 0 : backPos + 1;
    },
    getNextSlideIdx() {
      return this.isOverLen(this.currentSlide + 1) ? 0 : this.currentSlide + 1;
    },
    getPrevSlideIdx() {
      return this.currentSlide - 1 < 0
        ? this.items.length - 1
        : this.currentSlide - 1;
    },
    onPointerDown(e) {
      const val = e.type === "touchstart" ? e.touches[0].clientY : e.clientY;

      this.isPointerDown = true;
      this.dragStartPosY = val;
    },
    onPointerUp() {
      const currDiff = this.currDragYPos;
      const shouldSlide = directionFlag =>
        Math.abs(currDiff) > 60 &&
        (directionFlag ? currDiff >= 0 : currDiff < 0);

      this.isPointerDown = false;
      this.dragStartPosY = undefined;
      this.currDragYPos = undefined;

      if (shouldSlide(true)) this.nextSlide();
      else if (shouldSlide(false)) this.prevSlide();
    },

    onDrag: throttle(function(e) {
      if (this.isPointerDown) {
        const { sliderList } = this.$refs;
        const [_, activeSlide] = sliderList.children.map(vnode => vnode.elm);
        const clientY =
          e.type === "touchmove" ? e.touches[0].clientY : e.clientY;

        const betweenMinMax = val =>
          val >= 0 ? Math.min(val, 90) : Math.max(val, -90);
        const diff = betweenMinMax(Math.floor(clientY - this.dragStartPosY));

        this.currDragYPos = diff;
      }
    }, 1000 / 60),
    nextSlide() {
      this.currentSlide = this.getNextSlideIdx();
    },
    prevSlide() {
      this.currentSlide = this.getPrevSlideIdx();
    }
  }
};
</script>
 
<style lang="scss">
$easing: ease;
$duration: 420ms;

.h-heading-anim {
  &-enter-active,
  &-leave-active {
    transition: opacity $duration ease-in-out, transform $duration ease-in-out;
  }
  &-enter,
  &-leave-to {
    opacity: 0;
    transform: rotate(180deg) translateY(15px);
  }
}

.h-slider-composition-anim {
  &-enter-active,
  &-leave-active,
  &-move {
    transition: transform $duration $easing;
  }
}

.h-move-up-anim {
  transform: translateY(-100%) !important;
}

.slider {
  width: 100%;

  &__content {
    display: grid;
    grid-template-columns: 1fr 4fr 0fr;
    height: 18rem;
    padding-top: 1rem;
    overflow: hidden;

    @include bp($bp-very-small) {
      height: 23rem;
    }

    @include bp($bp-small) {
      padding-top: 2rem;
      height: 25rem;
      grid-template-columns: 2fr 6fr 1fr;
    }
  }

  &__header {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: end;
    position: relative;

    @include bp($bp-small) {
      grid-template-columns: 1fr 0fr;
    }
  }

  &__heading {
    writing-mode: vertical-lr;
    transform: rotate(180deg) translateY(5px);
    position: absolute;
    user-select: none;
    font-size: 2.49rem;
    bottom: 2rem;

    @include bp($bp-very-small) {
      font-size: 3.1rem;
    }

    @include bp($bp-small) {
      font-size: 3.1rem;
      bottom: initial;
    }
  }

  &__page-count {
    display: block;
    position: absolute;
    user-select: none;
    left: 0.5rem;

    @include bp($bp-small) {
      right: 1.5rem;
      left: initial;
    }
  }

  &__list-outer {
    position: relative;
  }

  &__list {
    list-style-type: none;
    margin: 0;
    padding: 0;
    height: 100%;
    cursor: grab;
  }

  &__item {
    position: absolute;
    top: 0;
    right: 0;
    width: 90%;
    height: 0;
    padding-bottom: 55.25%;
    overflow: hidden;
    box-shadow: 2px 13px 40px rgba(0, 0, 0, 0.4);
    border-radius: 8px;
    user-select: none;
    transition: transform $duration $easing;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    pointer-events: none;

    &::after {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: $color-dark-grey;
      opacity: 0;
      transition: opacity 600ms linear;
      transform: translate3d(0, 0, 0);
      backface-visibility: hidden;
    }

    &--prev-active {
      display: block;
      transform: translateY(-140%) translateX(-3rem) translate3d(0, 0, 0);
      transition: transform 500ms $easing;
      z-index: 4;
    }

    &--active {
      display: block;
      transform: translateX(-3rem) translate3d(0, 0, 0);
      z-index: 2;
    }

    &--back {
      display: block;
      transform: translateY(3rem) translate3d(0, 0, 0);
      pointer-events: all;

      &::after {
        opacity: 0.99;
      }

      & .slider__item-links {
        opacity: 1;
      }
    }

    &--next-back {
      transform: translateY(190%) translate3d(0, 0, 0);
      z-index: -1;

      &::after {
        opacity: 0.99;
      }
    }

    & img {
      width: 100%;
      user-select: none;
    }
  }

  &__item-links {
    position: absolute;
    bottom: 0;
    right: 0;
    display: flex;
    z-index: 5;
    list-style-type: none;
    margin: 0;
    padding: 0;
    height: 2.5rem;
    justify-content: space-between;
    align-items: center;
    padding: 0.3rem;
    opacity: 0;
    transition: opacity $duration $easing;
  }

  &__item-link {
    height: 100%;
    width: 2.5rem;
  }

  &__controls {
    display: none;
    flex-direction: column;
    justify-content: space-between;
    padding: 0.2rem 0.8rem;

    @include bp($bp-small) {
      display: flex;
    }
  }

  &__button {
    background-color: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
  }

  &__icon {
    display: flex;
    width: 100%;
    height: 100%;
    transition: opacity 300ms ease-in-out;

    &:hover {
      opacity: 0.8;
    }

    svg {
      fill: $color-white;
      width: 100%;
      height: 100%;
    }
  }
}
</style>