<template>
  <section class="section-about">
    <BackgroundShape class="section-about__background"></BackgroundShape>
    <div class="section-about__content">
      <h2 class="t-heading t-heading--inverted section-about__heading">About Me</h2>
      <p class="t-subtitle section-about__subtitle">Get to know me better</p>
      <p
        class="t-paragraph"
      >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <div class="section-about__slider"></div>
    </div>
  </section>
</template>

<script>
import BackgroundShape from "./../components/background-shape";

export default {
  components: {
    BackgroundShape
  },
  transition: {}
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

  &__content {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 85%;
    max-width: 42.62rem;
    margin-top: calc(8.78rem - #{$page-padding});
  }

  &__heading {
    text-align: center;
  }

  &__subtitle {
    text-align: center;
  }

  &__slider {
    width: 100%;
    height: 5rem;
    background-color: rgba($color-white, 0.25);
    border-radius: 8px;
  }
}
</style>
