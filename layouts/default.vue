<template>
  <div class="l-container">
    <div class="main-background"></div>
    <nuxt />
    <transition name="a-fade-delay" appear>
      <nuxt-link to="/" v-if="!isOnMainPage" class="navigation-link">
        <span class="navigation-link__icon">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            <path d="M0 0h24v24H0z" fill="none" />
          </svg>
        </span>
      </nuxt-link>
    </transition>
    <SideLinks></SideLinks>
  </div>
</template>

<script>
import throttle from "lodash.throttle";

import SideLinks from "@/components/side-links";

export default {
  components: {
    SideLinks
  },
  computed: {
    isOnMainPage() {
      return this.$route.path === "/";
    }
  }
};
</script>

<style lang="scss">
$computedMobilePosition: calcMobileSize(0.5rem, 0.05, 0.05);

@keyframes backgroundAnim {
  0% {
    transform: scale(1) translate(0%, 0%);
  }

  50% {
    transform: scale(1.25) translate(-10%, 5%);
  }

  100% {
    transform: scale(1) translate(0%, 0%);
  }
}

.l-container {
  & > .navigation-link {
    height: 3rem;
    width: 3rem;
    position: absolute;
    top: $computedMobilePosition;
    right: $computedMobilePosition;

    @include bp($bp-very-small) {
      top: var(--page-padding);
      right: var(--page-padding);
    }

    &:hover svg {
      fill: rgba($color-white, 0.7);
    }

    & svg {
      transition: fill 300ms ease-out;
      fill: $color-white;
      height: 100%;
      width: 100%;
    }

    & .navigation-link__icon {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
}

.main-background {
  background-image: url($main-bg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position-y: 52%;
  background-position-x: 85%;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: -1;
  animation: backgroundAnim 60s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite
    alternate;
  backface-visibility: hidden;
  transform: translate3D(0, 0, 0);

  // to fix bug with background image
  @supports (-webkit-box-reflect: unset) {
    background-position-x: initial;

    @include bp($bp-small) {
      background-position-x: 85%;
    }
  }

  @include bp($bp-very-large) {
    background-position-x: initial;
  }
}
</style>
