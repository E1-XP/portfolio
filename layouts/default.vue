<template>
  <div class="l-container">
    <div class="main-background"></div>
    <nuxt class="l-page" />
    <transition name="h-fade-anim" appear>
      <nuxt-link to="/" v-show="shouldShowHomeBtn" class="navigation-link">
        <span>
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
import Navigation from "./../components/navigation";
import SideLinks from "./../components/side-links";

export default {
  components: {
    Navigation,
    SideLinks
  },
  computed: {
    shouldShowHomeBtn() {
      return this.$route.path !== "/";
    }
  }
};
</script>

<style lang="scss">
$computedMobilePosition: calcMobileSize(0.5rem, 0.05, 0.05);

.l-container {
  width: 100%;
  height: 100vh;
  position: relative;

  & > .navigation-link {
    height: 3rem;
    width: 3rem;
    position: absolute;
    top: $computedMobilePosition;
    right: $computedMobilePosition;
    transition: fill 300ms ease-out;

    @include bp($bp-very-small) {
      top: $page-padding;
      right: $page-padding;
    }

    &:hover {
      fill: rgba($color-white, 0.7);
    }

    & svg {
      fill: $color-white;
      height: 100%;
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

.main-background {
  background-image: url($main-bg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position-y: 52%;
  width: 100%;
  height: 100%;
}
</style>
