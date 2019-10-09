<template>
  <nav class="navigation" :style="styles">
    <ul class="navigation__list">
      <li class="navigation__item">
        <nuxt-link
          to="/about"
          class="navigation__link"
          active-class="navigation__link--active"
        >About</nuxt-link>
      </li>
      <li class="navigation__item">
        <nuxt-link
          to="/projects"
          class="navigation__link"
          active-class="navigation__link--active"
        >Projects</nuxt-link>
      </li>
      <li class="navigation__item">
        <nuxt-link
          to="/contact"
          class="navigation__link"
          active-class="navigation__link--active"
        >Contact</nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  computed: {
    styles() {
      return {
        left: this.$route.path === "/" ? "2.5rem" : undefined
      };
    }
  }
};
</script>

<style lang="scss">
$bp-shape-large: 88.87em;

.navigation {
  position: absolute;
  bottom: calcMobileSize(0.5rem, 0.05, 0.05);
  left: 50%;
  transform: translateX(-50%);

  @include bp($bp-small) {
    bottom: $page-padding;
    left: 5.5rem;
    transform: none;
  }

  @include bp($bp-medium) {
    left: 9rem;
  }

  @include bp($bp-shape-large) {
    left: 11rem;
  }

  &__list {
    list-style-type: none;
    margin: 0;
    padding: 0;
    width: 17.37rem;
    display: grid;
    align-items: center;
    justify-content: space-between;
  }

  &__item {
    @include item-text;

    grid-row: 1;
  }

  &__link {
    text-decoration: none;
    display: inline-block;
    transition: color 300ms ease-out;

    &:hover,
    &--active {
      color: rgba($color-white, 0.7);
    }
  }
}
</style>