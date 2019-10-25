<template>
  <section class="section-projects">
    <client-only>
      <BackgroundShape class="section-projects__background"></BackgroundShape>
    </client-only>
    <transition name="h-fade-anim" appear>
      <div class="l-page-content section-projects__content">
        <h1 class="t-heading t-heading--inverted section-projects__heading">{{data.heading}}</h1>
        <p class="t-subtitle section-projects__subtitle">{{data.subtitle}}</p>
        <VerticalSlider :items="projects"></VerticalSlider>
      </div>
    </transition>
  </section>
</template>

<script>
import { mapState } from "vuex";

import BackgroundShape from "@/components/background-shape";
import VerticalSlider from "@/components/vertical-slider";

import {
  GET_REPOSITORIES,
  GET_PROJECTS,
  GET_PROJECTS_CONTENT
} from "@/store/types";

export default {
  components: {
    BackgroundShape,
    VerticalSlider
  },
  computed: {
    ...mapState({ data: state => state.projectsData }),
    ...mapState(["projects"])
  },
  async fetch({ store }) {
    await store.dispatch(GET_REPOSITORIES);
    await store.dispatch(GET_PROJECTS);
    await store.dispatch(GET_PROJECTS_CONTENT);
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

  &__heading {
    text-align: center;
  }

  &__subtitle {
    text-align: center;
  }
}
</style>