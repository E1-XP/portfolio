<template>
  <section class="section-projects">
    <BackgroundShape class="section-projects__background"></BackgroundShape>
    <transition name="h-fade-anim" appear>
      <div class="section-projects__content">
        <h2 class="t-heading t-heading--inverted section-projects__heading">Personal Portfolio</h2>
        <p
          class="t-subtitle section-projects__subtitle"
        >Non-commercial projects to gain valuable knowledge</p>
        <VerticalSlider :items="projects"></VerticalSlider>
      </div>
    </transition>
  </section>
</template>

<script>
import { mapState } from "vuex";

import BackgroundShape from "@/components/background-shape";
import VerticalSlider from "@/components/vertical-slider";

import { GET_REPOSITORIES, GET_PROJECTS } from "@/store/types";

export default {
  components: {
    BackgroundShape,
    VerticalSlider
  },
  computed: {
    ...mapState(["projects"])
  },
  async fetch({ store }) {
    await store.dispatch(GET_REPOSITORIES);
    await store.dispatch(GET_PROJECTS);
  }
};
</script>

<style lang="scss">
$bp-shape-large: 84.37rem;

.section-projects {
  background-color: rgba($color-white, 0.45);

  &__background {
    & > path {
      fill: $color-primary-alt;
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
}
</style>