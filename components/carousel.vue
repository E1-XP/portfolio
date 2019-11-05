<template>
  <Carousel
    class="carousel"
    :autoplay="shouldPlayCarousel"
    :autoplayTimeout="4500"
    :autoplayHoverPause="true"
    :perPage="4"
    :perPageCustom="[[700, 5]]"
    :loop="true"
    :paginationEnabled="false"
    :style="styles"
    @mousedown="onMouseDown"
    @mouseup="onMouseUp"
  >
    <Slide v-for="item in items" :key="item.name" class="carousel__item">
      <figure class="stack-card">
        <img :src="item.img" :alt="item.name" class="stack-card__icon" />
        <figcaption class="stack-card__name">{{item.name}}</figcaption>
      </figure>
    </Slide>
  </Carousel>
</template>

<script>
import Carousel from "vue-carousel/src/Carousel.vue";
import Slide from "vue-carousel/src/Slide.vue";

export default {
  components: {
    Slide,
    Carousel
  },
  props: {
    items: { type: Array, required: true }
  },
  data: () => ({
    isMouseDown: false,
    shouldPlayCarousel: false
  }),
  computed: {
    styles() {
      return { cursor: this.isMouseDown ? "grabbing" : undefined };
    }
  },
  methods: {
    onMouseDown() {
      this.isMouseDown = true;
    },
    onMouseUp() {
      this.isMouseDown = false;
    }
  },
  mounted() {
    setTimeout(() => (this.shouldPlayCarousel = true), 500);
  }
};
</script>

<style lang="scss">
.carousel {
  background-color: rgba($color-white, 0.25);
  border-radius: 8px;
  cursor: grab;

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
    @include text;

    text-align: center;
    font-size: 1.1rem;
    padding-top: 0.5rem;
  }
}

.VueCarousel-inner {
  height: 100% !important;
}
</style>