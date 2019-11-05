<template>
  <main>
    <section class="l-page section-projects">
      <client-only>
        <BackgroundShape class="section-projects__background"></BackgroundShape>
      </client-only>
      <transition name="a-fade" appear>
        <div ref="content" class="l-page-content section-projects__content">
          <h1 class="t-heading t-heading--inverted section-projects__heading">{{data.heading}}</h1>
          <p class="t-subtitle section-projects__subtitle">{{data.subtitle}}</p>
          <VerticalSlider :items="projects"></VerticalSlider>
          <Navigation></Navigation>
        </div>
      </transition>
    </section>
  </main>
</template>

<script>
import { mapState } from "vuex";

import BackgroundShape from "@/components/background-shape";
import VerticalSlider from "@/components/vertical-slider";
import Navigation from "@/components/navigation";

import {
  GET_REPOSITORIES,
  GET_PROJECTS,
  GET_PROJECTS_CONTENT,
  PRELOAD_PROJECT_IMGS
} from "@/store/types";

export default {
  components: {
    BackgroundShape,
    VerticalSlider,
    Navigation
  },
  computed: {
    ...mapState({ data: state => state.projectsData }),
    ...mapState(["projects"])
  },
  async fetch({ store }) {
    await store.dispatch(GET_REPOSITORIES);
    await store.dispatch(GET_PROJECTS);
    await store.dispatch(GET_PROJECTS_CONTENT);
  },
  mounted() {
    this.$store.dispatch(PRELOAD_PROJECT_IMGS);
  },
  beforeDestroy() {
    this.$refs.content.classList.add("a-move-off-screen-scale");
  }
};
</script>

<style lang="scss">
.section-projects {
  background-color: rgba($color-white, 0.45);

  &__background {
    & > path {
      fill: $color-primary-alt;
    }
  }

  &__content {
    padding-top: 1rem;

    @include bp($bp-very-small) {
      padding-top: 3rem;
    }

    @include bp($bp-small) {
      padding-top: initial;
    }
  }

  &__heading {
    text-align: center;
    font-size: 3.55rem;

    @include bp($bp-very-small) {
      font-size: 3.81rem;
    }
  }

  &__subtitle {
    text-align: center;
  }
}
</style>