<template>
  <div class="slider">
    <div class="slider__content">
      <div class="slider__header">
        <transition name="a-heading">
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
          name="a-slider-composition"
          :duration="360"
          class="slider__list"
          :style="sliderListStyle"
          ref="sliderList"
        >
          <li :key="getPrevActiveIdx()" class="slider__item slider__item--prev-active">
            <img :src="items[getPrevActiveIdx()].img" alt="project screenshot" />
            <ProjectLinks class="slider__item-links" :project="items[currentSlide]"></ProjectLinks>
          </li>
          <li
            :style="activeSlideStyle"
            :key="currentSlide"
            class="slider__item slider__item--active"
          >
            <img :src="items[currentSlide].img" alt="project screenshot" />
            <ProjectLinks class="slider__item-links" :project="items[currentSlide]"></ProjectLinks>
          </li>
          <li :key="getBackIdx()" class="slider__item slider__item--back">
            <img :src="items[getBackIdx()].img" alt="project screenshot" />
            <ProjectLinks class="slider__item-links" :project="items[currentSlide]"></ProjectLinks>
          </li>
          <li :key="getNextBackIdx()" class="slider__item slider__item--next-back">
            <img :src="items[getNextBackIdx()].img" alt="project screenshot" />
            <ProjectLinks class="slider__item-links" :project="items[currentSlide]"></ProjectLinks>
          </li>
        </transition-group>
        <p
          ref="swipeInfo"
          class="slider__help-info"
          :class="{'h-opacity-none' : wasDraggedBefore}"
        >Swipe up / down to slide</p>
      </div>
      <div class="slider__controls">
        <button @click="nextSlide" class="slider__button">
          <span class="slider__icon">
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path fill="none" d="M0 0h24v24H0V0z" />
              <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" />
            </svg>
          </span>
        </button>
        <button @click="prevSlide" class="slider__button">
          <span class="slider__icon">
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path fill="none" d="M0 0h24v24H0V0z" />
              <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" />
            </svg>
          </span>
        </button>
      </div>
    </div>
    <transition name="a-description" mode="out-in">
      <article :key="currentSlide" class="slider__description">
        <p class="t-paragraph">
          <span class="slider__description-heading">Objectives:</span>
          {{items[currentSlide].description}}
        </p>
        <p class="t-paragraph">
          <span class="slider__description-heading">Tech highlights:</span>
          {{items[currentSlide].tech}}
        </p>
      </article>
    </transition>
  </div>
</template>
 
<script>
import throttle from "lodash.throttle";

import ProjectLinks from "./project-links.vue";

export default {
  components: {
    ProjectLinks
  },
  props: {
    items: { type: Array, required: true }
  },
  data: () => ({
    currentSlide: 0,
    isPointerDown: false,
    dragStartPosY: undefined,
    currDragYPos: undefined,
    wasDraggedBefore: true
  }),
  computed: {
    sliderListStyle() {
      return {
        cursor: this.isPointerDown ? "grabbing" : "grab"
      };
    },
    activeSlideStyle() {
      return {
        transitionDuration: this.isPointerDown ? "33ms" : undefined,
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
    setWasDragged() {
      if (this.wasDraggedBefore) return;

      setTimeout(() => (this.wasDraggedBefore = true), 50);
      this.$refs.swipeInfo.classList.remove("a-pulse");

      localStorage.setItem("wasDraggedBefore", true);
    },
    onPointerDown(e) {
      const val = e.type === "touchstart" ? e.touches[0].clientY : e.clientY;

      this.setWasDragged();
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

      if (shouldSlide(true)) this.prevSlide();
      else if (shouldSlide(false)) this.nextSlide();
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
      document.documentElement.style.setProperty("--sliderDescPosX", `-5px`);
      this.currentSlide = this.getNextSlideIdx();
    },
    prevSlide() {
      document.documentElement.style.setProperty("--sliderDescPosX", `5px`);
      this.currentSlide = this.getPrevSlideIdx();
    }
  },
  mounted() {
    const wasDragged = localStorage.getItem("wasDraggedBefore") || false;

    this.wasDraggedBefore = wasDragged;

    if (!wasDragged)
      setTimeout(() => this.$refs.swipeInfo.classList.add("a-pulse"), 50);
  }
};
</script>
 
<style lang="scss">
$easing: ease;
$duration: 420ms;

.a-heading {
  &-enter-active,
  &-leave-active {
    transition: opacity 360ms ease-in-out, transform 360ms ease-in-out;
  }
  &-enter,
  &-leave-to {
    opacity: 0;
    transform: rotate(180deg) translateY(-15px);
  }
}

.a-description {
  &-enter-active,
  &-leave-active {
    transition: opacity 350ms ease-in, transform 200ms ease-in-out;
  }
  &-enter,
  &-leave-to {
    opacity: 0;
    transform: translateX(var(--sliderDescPosX));
  }
}

.a-slider-composition {
  &-enter-active,
  &-leave-active,
  &-move {
    transition: transform $duration $easing;
  }
}

.a-move-up {
  transform: translateY(-100%) !important;
}

.a-pulse {
  animation: a-pulse 1600ms linear infinite;
}

.slider {
  width: 100%;

  &__content {
    display: grid;
    grid-template-columns: 1fr 4fr 0fr;
    height: 21rem;
    padding-top: 2rem;
    overflow: hidden;
    margin-right: -2rem;
    padding-right: 2rem;

    @include bp($bp-very-small) {
      height: 23rem;
    }

    @include bp($bp-small) {
      height: 25rem;
      grid-template-columns: 2fr 6fr 1fr;
      margin-right: 0;
      padding-right: 0;
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
    touch-action: none;

    @include bp(640px) {
      margin-left: 2.5rem;
    }

    @include bp($bp-small) {
      margin-left: 0;
    }
  }

  &__list {
    list-style-type: none;
    margin: 0;
    padding: 0;
    height: 100%;
    cursor: grab;
    will-change: transform, opacity;
  }

  &__item {
    position: absolute;
    top: 0;
    right: 0;
    height: 0;
    width: 85%;
    padding-bottom: 52.25%;
    overflow: hidden;
    box-shadow: 2px 6px 29px rgba(0, 0, 0, 0.5);
    border-radius: 8px;
    user-select: none;
    transition: transform $duration $easing;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    pointer-events: none;
    will-change: transform, opacity;

    @include bp($bp-small) {
      width: 90%;
      padding-bottom: 55.25%;
      box-shadow: 2px 13px 40px rgba(0, 0, 0, 0.4);
    }

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
      will-change: transform, opacity;
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
      z-index: 3;
    }

    &--back {
      display: block;
      transform: translateY(3rem) translate3d(0, 0, 0);
      pointer-events: all;
      z-index: 2;

      &::after {
        opacity: 0.99;
      }

      & .slider__item-links {
        opacity: 1;
      }
    }

    &--next-back {
      transform: translateY(200%) translate3d(0, 0, 0);
      z-index: 1;

      &::after {
        opacity: 0.99;
      }
    }

    & img {
      width: 100%;
      user-select: none;
      transform: translate3D(0, 0, 0);
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

  &__help-info {
    margin: 0;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    transition: opacity 400ms ease;
    opacity: 1;

    @include bp($bp-small) {
      visibility: hidden;
    }
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

    &:first-of-type {
      .slider__icon:hover {
        animation: a-move-down-up 600ms ease-in-out 3;
      }
    }

    &:last-of-type {
      .slider__icon:hover {
        animation: a-move-up-down 600ms ease-in-out 3;
      }
    }
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