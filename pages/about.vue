<template>
  <main>
    <section class="l-page section-about">
      <client-only>
        <BackgroundShape class="section-about__background"></BackgroundShape>
      </client-only>
      <transition name="a-fade" appear @enter="onEnter">
        <div ref="content" class="l-page-content section-about__content">
          <h1 class="t-heading t-heading--inverted section-about__heading">
            {{ data.heading }}
          </h1>
          <p class="t-subtitle section-about__subtitle">{{ data.subtitle }}</p>
          <p class="t-paragraph">
            <img
              class="section-about__image"
              :src="data.img"
              alt="portfolio owner"
            />
            {{ data.aboutText }}
          </p>
          <h2
            class="t-heading-2 t-heading-2--inverted section-about__heading-2"
          >
            {{ data.stackHeading }}
          </h2>
          <p class="t-subtitle section-about__subtitle">
            {{ data.stackSubtitle }}
          </p>
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
  methods: {
    onEnter() {
      const { content } = this.$refs;

      const scale = () =>
        requestAnimationFrame(() => content.classList.add("a-scale-up"));

      setTimeout(scale, 300);
    }
  },
  async fetch({ store }) {
    await store.dispatch(GET_ABOUT_CONTENT);
  },
  beforeDestroy() {
    this.$refs.content.classList.add("a-move-off-screen-scale");
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

  &__image {
    float: right;
    height: 11rem;
    border-radius: 8px;
    border: 2px solid rgba($color-white, 0.2);
    margin: 0 0 14px 14px;
    pointer-events: none;
  }

  &__slider {
    width: 100%;
    margin-top: 0.8rem;
    margin-bottom: 0.8rem;
    height: calcMobileSize(6rem, 0.08, 0.05);

    @include bp($bp-very-small) {
      height: 7.5rem;
    }
  }
}
</style>
