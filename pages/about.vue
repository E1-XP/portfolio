<template>
  <section class="section-about">
    <BackgroundShape class="section-about__background"></BackgroundShape>
    <transition name="h-fade-anim" appear>
      <div class="section-about__content">
        <h2 class="t-heading t-heading--inverted section-about__heading">About Me</h2>
        <p class="t-subtitle section-about__subtitle">Get to know me better</p>
        <p
          class="t-paragraph"
        >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <client-only>
          <Carousel class="section-about__slider" :items="stack"></Carousel>
        </client-only>
      </div>
    </transition>
  </section>
</template>

<script>
import { mapState } from "vuex";
import BackgroundShape from "./../components/background-shape";
import Carousel from "./../components/carousel.vue";

export default {
  components: {
    BackgroundShape,
    Carousel
  },
  computed: {
    ...mapState(["stack"])
  }
};
</script>

<style lang="scss">
$bp-shape-large: 84.37rem;

.section-about {
  background-color: rgba($color-tertiary-alt, 0.5);

  &__background {
    & > path {
      fill: $color-tertiary;
    }
  }

  &__content {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
    max-width: 42.62rem;
    margin-top: calc(#{calcMobileSize(18vw, 0.4, 0.2)} - #{$page-padding});
    height: calcMobileSize(66.5vh, 0.1, 0.1);
    display: flex;
    flex-direction: column;

    @include bp($bp-very-small) {
      width: 70%;
      margin-top: calc(8.78rem - #{$page-padding});
      height: auto;
    }

    @include bp($bp-medium) {
      width: 85%;
      left: 45%;
    }

    @include bp($bp-large) {
      left: 48%;
    }

    @include bp($bp-shape-large) {
      left: calc(51% - (100vw - #{$bp-shape-large}) * 0.45);
    }
  }

  &__heading {
    text-align: center;
  }

  &__subtitle {
    text-align: center;
  }

  &__slider {
    width: 100%;
    height: calcMobileSize(6rem, 0.08, 0.05);
    margin-top: auto;

    @include bp($bp-very-small) {
      height: 7.5rem;
    }
  }
}
</style>
