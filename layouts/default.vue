<template>
  <div class="l-container">
    <div class="main-background"></div>
    <nuxt class="l-page" />
    <Navigation></Navigation>
    <SideLinks></SideLinks>
  </div>
</template>

<script>
import Navigation from "./../components/navigation";
import SideLinks from "./../components/side-links";

export default {
  components: {
    Navigation,
    SideLinks
  }
};
</script>

<style lang="scss">
.l-container {
  width: 100%;
  height: 100vh;
  position: relative;
}

.l-page {
  padding: $page-padding;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.main-background {
  background-image: url($main-bg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position-y: 25%;
  width: 100%;
  height: 100%;
}
</style>
