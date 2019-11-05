<template>
  <nav class="navigation">
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
.navigation {
  margin: 0 auto;
  margin-top: auto;

  &:not(&--global) {
    @include bp($bp-small) {
      margin-left: calc(-2rem - (100vw - 700px) * 0.3);
    }

    @include bp($bp-medium) {
      margin-left: calc(-5rem - (100vw - 1000px) * 0.5);
    }

    @include bp($bp-large) {
      margin-left: calc(-5rem - (100vw - 1200px) * 0.05);
    }

    @include bp($bp-very-large) {
      margin-left: calc(-10rem - (100vw - 1600px) * 0.01);
    }
  }

  &--global {
    position: fixed;
    bottom: var(--page-padding);
    left: 50%;
    transform: translateX(-50%);

    @include bp($bp-very-small) {
      position: absolute;
    }

    @include bp($bp-small) {
      left: 2.5rem;
      transform: none;
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
}
</style>