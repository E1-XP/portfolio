<template>
  <section class="section-contact">
    <BackgroundShape class="section-contact__background"></BackgroundShape>
    <transition name="h-fade-anim" appear>
      <div class="section-contact__content">
        <h2 class="t-heading t-heading--inverted section-contact__heading">{{data.heading}}</h2>
        <p class="t-subtitle section-contact__subtitle">{{data.subtitle}}</p>
      </div>
    </transition>
  </section>
</template>

<script>
import { mapState } from "vuex";
import BackgroundShape from "./../components/background-shape";

import { GET_CONTACT_CONTENT } from "@/store/types";

export default {
  components: {
    BackgroundShape
  },
  computed: {
    ...mapState({ data: state => state.contactData })
  },
  async fetch({ store }) {
    await store.dispatch(GET_CONTACT_CONTENT);
  }
};
</script>

<style lang="scss">
.section-contact {
  background-color: rgba($color-secondary-alt, 0.49);

  &__background {
    & > path {
      fill: $color-secondary-alt2;
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