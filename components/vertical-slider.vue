<template>
  <div class="slider">
    <ul class="slider__list">
      <li v-for="(item,idx) in items" :key="item.id" class="slider__item">{{idx}} {{item.name}}</li>
    </ul>
    <div class="slider__controls">
      <button class="slider__button">prev</button>
      <button class="slider__button">next</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: { type: Array, requuired: true }
  }
};
</script>

<style lang="scss">
.slider {
  width: 100%;
  height: 25rem;
  border: 1px solid $color-dark-grey;

  &__list {
    list-style-type: none;
  }

  &__item {
  }

  &__controls {
  }

  &__button {
  }
}
</style>