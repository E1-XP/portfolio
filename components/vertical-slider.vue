<template>
  <div class="slider">
    <div class="slider__content">
      <div class="slider__header">
        <h3 class="t-heading t-heading--inverted slider__heading">{{items[currentSlide].name}}</h3>
        <span class="slider__page-count">{{currentSlide + 1}} / {{items.length}}</span>
      </div>
      <div class="slider__list-outer">
        <transition-group
          tag="ul"
          name="h-slider-composition-anim"
          :duration="360"
          class="slider__list"
          ref="sliderList"
        >
          <li :key="getPrevActiveIdx()" class="slider__item slider__item--prev-active">
            <img :src="images[getPrevActiveIdx()]" alt="project screenshot" />
          </li>
          <li :key="currentSlide" class="slider__item slider__item--active">
            <img :src="images[currentSlide]" alt="project screenshot" />
          </li>
          <li :key="getBackIdx()" class="slider__item slider__item--back">
            <img :src="images[getBackIdx()]" alt="project screenshot" />
          </li>
          <li :key="getNextBackIdx()" class="slider__item slider__item--next-back">
            <img :src="images[getNextBackIdx()]" alt="project screenshot" />
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
        <span>Objectives:</span> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia delectus odio provident laborum eum, neque commodi quae ut itaque, quidem minus. Fugit illum minus dolorum natus ducimus culpa porro eveniet!
      </p>
      <p class="t-paragraph">
        <span>Tech highlights:</span> Lorem ipsum dolor sit amet incidunt fuga voluptates harum ab fugiat ipsa? Necessitatibus, nisi exercitationem.
      </p>
    </article>
  </div>
</template>

<script>
export default {
  props: {
    items: { type: Array, required: true },
    images: { type: Array, required: true }
  },
  data: () => ({
    currentSlide: 0
  }),
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
$easing: ease-in-out;
$duration: 420ms;

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
    grid-template-columns: 2fr 6fr 1fr;
    height: 25rem;
    padding-top: 2rem;
    overflow: hidden;
  }

  &__header {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: end;
  }

  &__heading {
    writing-mode: vertical-lr;
    transform: rotate(180deg);
  }

  &__page-count {
    display: block;
  }

  &__list-outer {
    position: relative;
  }

  &__list {
    list-style-type: none;
    margin: 0;
    padding: 0;
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
    cursor: grab;
    transition: transform $duration $easing;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;

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

      &::after {
        opacity: 0.99;
      }
    }

    &--next-back {
      transform: translateY(175%) translate3d(0, 0, 0);
      z-index: -1;

      &::after {
        opacity: 0.99;
      }
    }

    & img {
      width: 100%;
    }
  }

  &__controls {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0.2rem 0.8rem;
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

    svg {
      fill: $color-white;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
