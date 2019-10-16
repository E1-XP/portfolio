<template>
  <div class="slider">
    <div class="slider__content">
      <div class="slider__header">
        <h3 class="t-heading t-heading--inverted slider__heading">{{items[currentSlide].name}}</h3>
        <span class="slider__page-count">{{currentSlide + 1}} / {{items.length}}</span>
      </div>
      <ul class="slider__list">
        <li
          v-for="(item,idx) in items"
          :key="item.id"
          :class="`slider__item ${getClassModifier(idx)}`"
        >
          <img
            :src="idx % 2 ? 'https://353a23c500dde3b2ad58-c49fe7e7355d384845270f4a7a0a7aa1.ssl.cf2.rackcdn.com/5d84fecb4f73fd00085f3523/screenshot.png': 'https://353a23c500dde3b2ad58-c49fe7e7355d384845270f4a7a0a7aa1.ssl.cf2.rackcdn.com/5d84e89f0238530007bdc667/screenshot.png'"
            alt
          />
        </li>
      </ul>
      <div class="slider__controls">
        <button @click="prevSlide" class="slider__button">prev</button>
        <button @click="nextSlide" class="slider__button">next</button>
      </div>
    </div>
    <article class="slider__description">
      <p class="t-paragraph">
        <span>Objectives:</span> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia delectus odio provident laborum eum, neque commodi quae ut itaque, quidem minus. Fugit illum minus dolorum natus ducimus culpa porro eveniet!
      </p>
      <p class="t-paragraph">
        <span>Tech highlights:</span> Lorem ipsum dolor sit amet consectetur adipisicing elit incidunt fuga voluptates harum ab fugiat ipsa? Necessitatibus, nisi exercitationem.
      </p>
    </article>
  </div>
</template>

<script>
export default {
  props: {
    items: { type: Array, required: true }
  },
  data: () => ({
    currentSlide: 0,
    isForwardDirection: true
  }),
  methods: {
    getClassModifier(idx) {
      if (this.currentSlide === idx) return "slider__item--active";

      const isOverLen = idx => idx > this.items.length - 1;
      const backPos = isOverLen(this.currentSlide + 1)
        ? 0
        : this.currentSlide + 1;
      if (idx === backPos) return "slider__item--back";

      return "";
    },
    calcNextSlideIdx() {
      return this.currentSlide + 1 > this.items.length - 1
        ? 0
        : this.currentSlide + 1;
    },
    calcPrevSlideIdx() {
      return this.currentSlide - 1 < 0
        ? this.items.length - 1
        : this.currentSlide - 1;
    },
    nextSlide() {
      this.isForwardDirection = true;

      this.currentSlide = this.calcNextSlideIdx();
    },
    prevSlide() {
      this.isForwardDirection = false;

      this.currentSlide = this.calcPrevSlideIdx();
    }
  }
};
</script>

<style lang="scss">
.slider {
  width: 100%;
  margin-top: 2rem;

  &__content {
    display: grid;
    grid-template-columns: 2fr 6fr 1fr;
    height: 25rem;
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

  &__list {
    list-style-type: none;
    margin: 0;
    padding: 0;
    position: relative;
  }

  &__item {
    position: absolute;
    top: 0;
    right: 0;
    width: 90%;
    height: 0;
    padding-bottom: 55.25%;
    display: none;
    overflow: hidden;
    box-shadow: 2px 13px 40px rgba(0, 0, 0, 0.4);
    border-radius: 8px;
    user-select: none;
    cursor: grab;

    &::after {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    &--active {
      display: block;
      transform: translateX(-3rem);
      z-index: 2;
    }

    &--back {
      display: block;
      transform: translateY(3rem);

      &::after {
        background-color: rgba($color-dark-grey, 0.99);
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
  }

  &__button {
  }
}
</style>
