<template>
  <div class="l-container">
    <div class="main-background"></div>
    <nuxt class="l-page" />
    <transition name="h-fade-anim-delay" appear>
      <nuxt-link to="/" v-if="shouldShowHomeBtn" class="navigation-link">
        <span class="navigation-link__icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            <path d="M0 0h24v24H0z" fill="none" />
          </svg>
        </span>
      </nuxt-link>
    </transition>
    <Navigation></Navigation>
    <SideLinks></SideLinks>
  </div>
</template>

<script>
import throttle from "lodash.throttle";

import Navigation from "@/components/navigation";
import SideLinks from "@/components/side-links";

export default {
  components: {
    Navigation,
    SideLinks
  },
  computed: {
    shouldShowHomeBtn() {
      return this.$route.path !== "/";
    }
  },
  methods: {
    setVH: throttle(function() {
      if (window.innerWidth > 500) return;

      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    }, 1000 / 60)
  },
  mounted() {
    this.setVH();
    window.addEventListener("resize", this.setVH);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.setVH);
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
  width: 100%;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  position: relative;
  overflow: hidden;

  @include bp($bp-very-small) {
    height: 100vh;
  }

  & > .navigation-link {
    height: 3rem;
    width: 3rem;
    position: absolute;
    top: $computedMobilePosition;
    right: $computedMobilePosition;

    @include bp($bp-very-small) {
      top: $page-padding;
      right: $page-padding;
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

.l-page {
  padding: $page-padding-small;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;

  @include bp($bp-small) {
    padding: $page-padding;
  }
}

.l-page-content {
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

.main-background {
  background-image: url($main-bg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position-y: 52%;
  background-position-x: 85%;
  width: 100%;
  height: 100%;
  animation: backgroundAnim 60s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite
    alternate;
  backface-visibility: hidden;
  transform: translate3D(0, 0, 0);

  @include bp($bp-very-large) {
    background-position-x: initial;
  }
}
</style>
