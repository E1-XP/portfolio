<template>
  <nav class="navigation">
    <ul class="navigation__list">
      <li class="navigation__item">
        <nuxt-link to="/about" class="navigation__link">About</nuxt-link>
      </li>
      <li class="navigation__item">
        <nuxt-link to="/projects" class="navigation__link">Projects</nuxt-link>
      </li>
      <li class="navigation__item">
        <nuxt-link to="/contact" class="navigation__link">Contact</nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {};
</script>

<style lang="scss">
.navigation {
  position: absolute;
  bottom: $page-padding;
  left: $page-padding;

  &__list {
    list-style-type: none;
  }

  &__item {
  }

  &__link {
    text-decoration: none;
  }
}
</style>