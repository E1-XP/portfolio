<template>
  <nav class="navigation" :class="{'h-to-left' : $nuxt.$route.path === '/'}">
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
export default {};
</script>

<style lang="scss">
$bp-shape-large: 88.87em;

.navigation {
  margin: 0 auto;
  margin-top: auto;
  padding-top: 1rem;

  @include bp($bp-very-small) {
    display: none;
  }

  &--global {
    position: absolute;
    bottom: $page-padding;
    left: 50%;
    transform: translateX(-50%);
    display: none;

    @include bp($bp-very-small) {
      display: initial;
    }

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

  &.h-to-left {
    margin: initial;
    margin-top: initial;
    padding-top: initial;

    @include bp($bp-small) {
      left: 2.5rem;
    }
  }
}
</style>