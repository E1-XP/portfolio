<template>
  <main>
    <section class="l-page section-about">
      <client-only>
        <BackgroundShape class="section-about__background"></BackgroundShape>
      </client-only>
      <transition name="h-fade-anim" appear>
        <div class="l-page-content section-about__content">
          <h1 class="t-heading t-heading--inverted section-about__heading">{{data.heading}}</h1>
          <p class="t-subtitle section-about__subtitle">{{data.subtitle}}</p>
          <p class="t-paragraph">{{data.aboutText}}.</p>
          <h2 class="t-heading-2 t-heading-2--inverted section-about__heading-2">{{'Tech Stack'}}</h2>
          <client-only>
            <Carousel class="section-about__slider" :items="stack"></Carousel>
          </client-only>
          <Navigation></Navigation>
        </div>
      </transition>
    </section>
  </main>
</template>

<script>
import { mapState } from "vuex";

import BackgroundShape from "@/components/background-shape";
import Carousel from "@/components/carousel.vue";
import Navigation from "@/components/navigation";

import { GET_ABOUT_CONTENT } from "@/store/types";

export default {
  components: {
    BackgroundShape,
    Carousel,
    Navigation
  },
  computed: {
    ...mapState({ data: state => state.aboutData }),
    ...mapState(["stack"])
  },
  async fetch({ store }) {
    await store.dispatch(GET_ABOUT_CONTENT);
  }
};
</script>

<style lang="scss">
.section-about {
  background-color: rgba($color-tertiary-alt, 0.5);

  &__background {
    & > path {
      fill: $color-tertiary;
    }
  }

  &__heading {
    text-align: center;
  }

  &__heading-2 {
    text-align: center;
    margin-top: auto;
  }

  &__subtitle {
    text-align: center;
  }

  &__slider {
    width: 100%;
    margin-top: 0.8rem;
    height: calcMobileSize(6rem, 0.08, 0.05);

    @include bp($bp-very-small) {
      height: 7.5rem;
    }
  }
}
</style>
