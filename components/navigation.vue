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
  left: 50%;
  transform: translateX(-50%);

  @include bp($bp-small) {
    left: $page-padding;
    transform: none;
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

    &:hover {
      color: rgba($color-white, 0.7);
    }
  }
}
</style>