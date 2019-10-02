<template>
  <section class="section-about">
    <BackgroundShape class="section-about__background"></BackgroundShape>
    <div class="section-about__content">
      <h2 class="t-heading t-heading--inverted">About Me</h2>
      <p class="t-subtitle">Get to know me better</p>
      <p
        class="t-paragraph"
      >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    </div>
    <div class="section-about__slider"></div>
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
  }
}
</style>
