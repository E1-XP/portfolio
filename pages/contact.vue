<template>
  <section class="section-contact">
    <BackgroundShape class="section-contact__background"></BackgroundShape>
  </section>
</template>

<script>
import BackgroundShape from "./../components/background-shape";

export default {
  components: {
    BackgroundShape
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
}
</style>