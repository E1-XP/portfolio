<template>
  <aside class="side-links">
    <ul class="side-links__list">
      <li class="side-links__item">
        <a href="#" class="side">a</a>
      </li>
      <li class="side-links__item">
        <a href="#" class="side">b</a>
      </li>
      <li class="side-links__item">
        <a href="#" class="side">c</a>
      </li>
    </ul>
  </aside>
</template>

<script>
export default {};
</script>

<style lang="scss">
.side-links {
  position: absolute;
  background-color: $color-dark-grey;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
</style>