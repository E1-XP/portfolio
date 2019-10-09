<template>
  <Carousel
    class="carousel"
    :autoplay="true"
    :autoplayTimeout="4000"
    :autoplayHoverPause="true"
    :perPage="4"
    :perPageCustom="[[700, 5]]"
    :loop="true"
    :paginationEnabled="false"
  >
    <Slide v-for="item in items" v-bind:key="item.name" class="carousel__item">
      <figure class="stack-card">
        <img v-bind:src="item.img" v-bind:alt="item.name" class="stack-card__icon" />
        <figcaption class="stack-card__name">{{item.name}}</figcaption>
      </figure>
    </Slide>
  </Carousel>
</template>

<script>
import { Slide, Carousel } from "vue-carousel";

export default {
  components: {
    Slide,
    Carousel
  },
  props: {
    items: { type: Array, required: true }
  }
};
</script>

<style lang="scss">
.carousel {
  background-color: rgba($color-white, 0.25);
  border-radius: 8px;

  &__list {
    height: 100%;
    list-style-type: none;
  }

  &__item {
    height: 100%;
    width: 25%;
    padding: 0.7rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.stack-card {
  height: 100%;
  display: flex;
  width: 100%;
  margin: 0;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  &__icon {
    height: 70%;
  }

  &__name {
    text-align: center;
    color: $color-black;
  }
}

.VueCarousel-inner {
  height: 100% !important;
}
</style>