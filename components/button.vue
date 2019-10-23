<template>
  <button class="button">
    <slot></slot>
  </button>
</template>

<script>
export default {};
</script>

<style lang="scss">
.button {
  @include item-text;

  font-size: 2rem;
  padding-top: 0.5rem;
  border: none;
  border-radius: 7px;
  background-color: rgba($color-dark-grey, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 300ms ease-in-out;
  box-shadow: 2px 3px 21px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.36);

  &:hover {
    background-color: rgba($color-dark-grey, 0.75);
  }
}
</style>