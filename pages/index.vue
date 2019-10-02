<template>
  <header class="header">
    <h1 class="t-heading header__logo">
      <nuxt-link class="header__link" to="/">Jan Kowalski</nuxt-link>
    </h1>
    <div class="header__content">
      <h2 class="t-heading header__heading">Designed to Grow</h2>
      <p class="t-subtitle header__subtitle">Aspiring JavaScript Developer</p>
    </div>
  </header>
</template>

<script>
export default {
  components: {}
};
</script>

<style lang="scss">
.header {
  &__logo {
    font-size: 2.62rem;
  }

  &__heading {
    color: rgba($color-secondary, 70%);
    mix-blend-mode: color-burn;
  }

  &__link {
    display: table-caption;
  }

  &__subtitle {
    font-size: 1.81rem;
    text-align: center;
    color: rgba($color-black, 0.85);
  }

  &__content {
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translateX(-50%);
  }
}
</style>
