<template>
  <main>
    <transition name="h-fade-anim-delay" appear>
      <header class="l-page header">
        <h1 class="t-heading header__logo">
          <nuxt-link class="header__link" to="/">{{headerData.logo}}</nuxt-link>
        </h1>
        <div class="header__content">
          <h2 class="t-heading header__heading">{{headerData.heading}}</h2>
          <p class="t-subtitle header__subtitle">{{headerData.subtitle}}</p>
        </div>
      </header>
    </transition>
    <Navigation class="header__navigation"></Navigation>
  </main>
</template>

<script>
import { mapState } from "vuex";

import Navigation from "@/components/navigation";

import { GET_HEADER_CONTENT } from "@/store/types";

export default {
  components: {
    Navigation
  },
  computed: {
    ...mapState(["headerData"])
  },
  async fetch({ store }) {
    await store.dispatch(GET_HEADER_CONTENT);
  }
};
</script>

<style lang="scss">
$max-fluid-font-size-mq: 26.35em;

.header {
  &__logo {
    font-size: 2.62rem;
  }

  &__heading {
    color: rgba($color-secondary, 80%);

    @supports (background-clip: text) or (-webkit-background-clip: text) {
      background: linear-gradient(
        to bottom,
        darken(rgba($color-secondary, 0.6), 25%) 19%,
        rgba($color-secondary, 0.9) 52%,
        lighten(rgba($color-secondary, 0.7), 10%) 80%
      );
      background-clip: text;
      -webkit-background-clip: text;
      color: transparent;
    }

    text-align: center;
    font-size: 13vw;

    @include bp($max-fluid-font-size-mq) {
      font-size: 3.81rem;
    }
  }

  &__link {
    display: table-caption;
    transition: color 300ms ease-out;

    &:hover {
      color: rgba($color-white, 0.7);
    }
  }

  &__subtitle {
    font-size: 6.5vw;
    text-align: center;
    color: rgba($color-black, 0.85);

    @include bp($max-fluid-font-size-mq) {
      font-size: 1.81rem;
    }
  }

  &__content {
    position: absolute;
    left: 50%;
    top: 35%;
    transform: translateX(-50%);
    width: 100%;
  }

  &__navigation {
    position: absolute;
    bottom: $page-padding-very-small;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
